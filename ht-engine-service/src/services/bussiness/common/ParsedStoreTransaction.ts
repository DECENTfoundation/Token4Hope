import { TransactionDirection } from "../../../models/constants/TransactionDirection";

export interface ParsedStoreTransaction {
    amount: string;
    timestamp: string;
    account: string;
    direction: TransactionDirection;
    accountChainName: string;
    found: boolean;
}
