import { BlockChainAccount } from "../../../plugins/blockchain";

export interface FilterTransferOptions {
    direction: string;
    account: BlockChainAccount;
}
