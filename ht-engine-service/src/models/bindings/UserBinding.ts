import * as Boom from "boom";
import * as Hapi from "hapi";
import { ContainerModule } from "inversify";
import * as _ from "lodash";

import { UsersController } from "../../controllers/api/v1/UsersController";
import { AuthIdentityPolicy } from "../../plugins/auth";
import { OrmModelProvider } from "../../plugins/orm";
import { RestMethod } from "../../utils/http";
import { Payload } from "../../utils/payload";
import { EntityKeyError } from "../constants/EntityKeyError";
import { User } from "../entities/User";
import { ErrorEvent } from "../events/ErrorEvent";

export const UserBinding = (): ContainerModule => {
    return new ContainerModule((bind) => {
        bind<OrmModelProvider>(RestMethod.Show).toProvider<User>((context) => {
            return async (source: Hapi.Request): Promise<User> => {
                return await User.findByPrimary(source.params.userId);
            };
        }).whenInjectedInto(UsersController.name);

        bind<OrmModelProvider>(RestMethod.Edit).toProvider<User>((context) => {
            return async (source: Hapi.Request, user: User): Promise<User> => {

                const payload = source.payload as Payload;

                if (!_.isNil(payload.password)) {
                    if (_.isNil(payload.oldPassword)) {
                        throw Boom.badData();
                    }
                    await User.authenticate(
                        AuthIdentityPolicy.Email,
                        { email: user.email, password: payload.oldPassword },
                    );
                }

                if (_.isNil(user)) {
                    throw Boom.notFound<ErrorEvent<EntityKeyError>>(
                        null, { key: EntityKeyError.NotFound, entity: User.name },
                    );
                }
                return await user.update({ ...payload });
            };
        }).whenInjectedInto(UsersController.name);
    });
};
