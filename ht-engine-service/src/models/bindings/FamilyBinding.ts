import * as Boom from "boom";
import * as Hapi from "hapi";
import { ContainerModule } from "inversify";
import * as _ from "lodash";
import { FamiliesController } from "../../controllers/api/v1/FamiliesController";

import { OrmModelProvider } from "../../plugins/orm/index";
import { RestMethod } from "../../utils/http/index";
import { KeyGenerator } from "../../utils/keypair/KeyGenerator";
import { Payload } from "../../utils/payload/index";
import { EntityKeyError } from "../constants/EntityKeyError";
import { OrganizationType } from "../constants/OrganizationType";
import { ChainEntity } from "../entities/ChainEntity";
import { Family } from "../entities/Family";
import { KeyPair } from "../entities/KeyPair";
import { Organization } from "../entities/Organization";
import { ErrorEvent } from "../events/ErrorEvent";

export const FamilyBinding = (): ContainerModule => {
    return new ContainerModule((bind) => {

        bind<OrmModelProvider>(RestMethod.Edit).toProvider<Family>((context) => {
            return async (source: Hapi.Request): Promise<Family> => {
                const payload = source.payload as Payload;
                const family = await Family.findOne({ where: { ["$chainEntity.name$" as any]: source.params.cardNumber } });
                if (_.isNil(family)) {
                    throw Boom.notFound<ErrorEvent<EntityKeyError>>(
                        null, { key: EntityKeyError.NotFound, entity: Family.name },
                    );
                }
                return await family.update({ ...payload, password: payload.pin });
            };
        }).whenInjectedInto(FamiliesController.name);

        bind<OrmModelProvider>(RestMethod.Show).toProvider<Organization>((context) => {
            return async (source: Hapi.Request): Promise<Organization> => {
                const organization = await Organization.findOne({ where: { role: OrganizationType.Charity } });
                if (_.isNil(organization)) {
                    throw Boom.notFound<ErrorEvent<EntityKeyError>>(
                        null, { key: EntityKeyError.NotFound, entity: Organization.name },
                    );
                }
                return organization;
            };
        }).whenInjectedInto(FamiliesController.name);

        bind<OrmModelProvider>(RestMethod.Create).toProvider<Family>((context) => {
            return async (source: Hapi.Request): Promise<Family> => {
                const payload = source.payload as Payload;
                const family = await Family.findOne({ where: { ["$chainEntity.name$" as any]: payload.cardNumber } });
                if (!_.isNil(family)) {
                    throw Boom.conflict<ErrorEvent<EntityKeyError>>(
                        null, { key: EntityKeyError.AlreadyExist, entity: Family.name },
                    );
                }

                const newKey = await new KeyPair(KeyGenerator.generate()).save();

                const newChainEntity = await new ChainEntity({
                    chainName: KeyGenerator.getFamilyChainName(),
                    key: newKey,
                    name: payload.cardNumber,
                }).save();

                await newChainEntity.$set("key", newKey);

                const newFamily = await new Family({
                    password: payload.pin,
                }).save();

                await newFamily.$set("chainEntity", newChainEntity);

                return await Family.findOne({ where: { ["$chainEntity.name$" as any]: payload.cardNumber }});
            };
        }).whenInjectedInto(FamiliesController.name);

        bind<OrmModelProvider>(RestMethod.Delete).toProvider<Family>((context) => {
            return async (source: Hapi.Request, family: Family): Promise<any> => {
                if (_.isNil(family)) {
                    throw Boom.notFound<ErrorEvent<EntityKeyError>>(
                        null, { key: EntityKeyError.NotFound, entity: Family.name },
                    );
                }
                return await family.destroy();
            };
        }).whenInjectedInto(FamiliesController.name);
    });
};
