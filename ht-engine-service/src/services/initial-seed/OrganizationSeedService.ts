import { injectable } from "inversify";
import * as _ from "lodash";
import { ChainEntity } from "../../models/entities/ChainEntity";
import { KeyPair } from "../../models/entities/KeyPair";
import { Organization } from "../../models/entities/Organization";
import { User } from "../../models/entities/User";
import { InitialSeedExecuter } from "../../plugins/initial-seed/InitialSeedExecuter";
import { OrganizationDataSeed } from "./metadata/OrganizationDataSeed";

@injectable()
export class OrganizationSeedService implements InitialSeedExecuter {
    public async execute(seedData: OrganizationDataSeed[]) {
        await Promise.all(seedData.map(async ($) => {
            const chainEntity = await ChainEntity.findOne({ where: { name: $.name }});
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

                for ( const { email, password } of $.users) {
                    const userEntity = await User.create({
                        email,
                        password,
                    });

                    await userEntity.$set("organization", organization);
                }
            }
        }));
    }
}
