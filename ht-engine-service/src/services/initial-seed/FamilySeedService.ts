import { injectable } from "inversify";
import * as _ from "lodash";
import { ChainEntity } from "../../models/entities/ChainEntity";
import { Family } from "../../models/entities/Family";
import { KeyPair } from "../../models/entities/KeyPair";
import { InitialSeedExecuter } from "../../plugins/initial-seed/InitialSeedExecuter";
import { FamilyDataSeed } from "./metadata/FamilyDataSeed";

@injectable()
export class FamilySeedService implements InitialSeedExecuter {
    public async execute(seedData: FamilyDataSeed[]) {
        await Promise.all(seedData.map(async ($) => {

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
    }
}
