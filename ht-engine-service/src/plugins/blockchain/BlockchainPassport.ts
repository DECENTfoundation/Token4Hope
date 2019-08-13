import { BlockchainAmount } from "./BlockchainAmount";
import { BlockchainCredentials } from "./BlockchainCredentials";

export interface BlockchainPassport {
    id?: string;
    name?: string;
    price?: BlockchainAmount;
    credentials?: BlockchainCredentials;
}
