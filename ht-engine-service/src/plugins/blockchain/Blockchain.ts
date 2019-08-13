import { BlockchainOptions } from "./BlockchainOptions";

export interface Blockchain {
    getOptions(): BlockchainOptions;
}
