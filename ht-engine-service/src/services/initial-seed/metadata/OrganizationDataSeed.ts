import { BaseChainDataSeed } from "./base/BaseChainDataSeed";
import { UserDataSeed } from "./UserDataSeed";

export interface OrganizationDataSeed extends BaseChainDataSeed {
    name: string;
    role: string;
    users: UserDataSeed[];
}
