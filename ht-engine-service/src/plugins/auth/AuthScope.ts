import { BlockchainPassportDto } from "../../models/transfer-objects/BlockchainPassportDto";

import { BlockchainPassport } from "../blockchain";

export interface AuthScope {
    unlockPassport(owner: string | BlockchainPassport): Promise<BlockchainPassportDto>;
    isAdmin(throwable?: boolean): Promise<boolean>;
    is(roles: string | string[], throwable?: boolean): Promise<boolean>;
}
