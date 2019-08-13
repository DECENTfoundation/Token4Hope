import * as Hapi from "hapi";
import * as _ from "lodash";
import { ChainEntity } from "../../../src/models/entities/ChainEntity";
import { Family } from "../../../src/models/entities/Family";
import { KeyPair } from "../../../src/models/entities/KeyPair";
import { Organization } from "../../../src/models/entities/Organization";
import { TransferOperation } from "../../../src/models/entities/TransferOperation";
import { User } from "../../../src/models/entities/User";
import { InitialSeedOptions } from "../../../src/plugins/initial-seed";
import { ConfigUtils } from "../../../src/utils/configuration";
import { OperationSeed } from "./OperationSeed";

export class DataFactory {
    public static async seed(server: Hapi.Server): Promise<void> {
        const options = ConfigUtils.resolve<InitialSeedOptions>("initialseed", { use: true });

        await Promise.all(options.initialSeeds[0].seedData.map(async ($) => {
            const chainEntity = await ChainEntity.findOne({ where: { name: $.cardNumber }});
            if (_.isNil(chainEntity)) {
                const newEntity = await ChainEntity.create({
                    chainId: $.chainId,
                    chainName: $.chainName,
                    name: $.cardNumber,
                });

                const keyPair = await KeyPair.create({
                    brainKey: $.brainKey,
                    privateKey: $.privateKey,
                    publicKey: $.publicKey,
                });

                await newEntity.$set("key", keyPair);

                const family = await Family.create({
                    password: $.password,
                });
                await family.$set("chainEntity", newEntity);
            }
        }));

        await Promise.all(options.initialSeeds[1].seedData.map(async ($) => {
            const chainEntity = await ChainEntity.findOne({ where: { name: $.cardNumber }});
            if (_.isNil(chainEntity)) {
                const newEntity = await ChainEntity.create({
                    chainId: $.chainId,
                    chainName: $.chainName,
                    name: $.name,
                });

                const keyPair = await KeyPair.create({
                    brainKey: $.brainKey,
                    privateKey: $.privateKey,
                    publicKey: $.publicKey,
                });

                await newEntity.$set("key", keyPair);

                const organization = await Organization.create({
                    role: $.role,
                });
                await organization.$set("chainEntity", newEntity);

                const user = await User.create({
                    email: $.email,
                    password: $.password,
                });
                await user.$set("organization", organization);
            }
        }));

        for (const $ of OperationSeed) {
            const values = {
                    amount: $.amount,
                    blockTimestamp: $.timestamp,
                    fromAddress: $.from,
                    toAddress: $.to,
                };
            const operation = await TransferOperation.findOne({ where: values });
            if (_.isNil(operation)) {
                await TransferOperation.create(values);
            }
        }
    }
}
