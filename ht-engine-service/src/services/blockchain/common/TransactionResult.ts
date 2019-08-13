import { TransactionConfirmation } from "dcorejs-sdk";
import * as _ from "lodash";

import { BlockChainAccount } from "../../../plugins/blockchain/BlockchainStrategy";

export class TransactionResult {

    public from: string;
    public to: string;
    public amount: string;
    public transaction: TransactionConfirmation;

    constructor(
        from: BlockChainAccount,
        to: BlockChainAccount,
        amount: string,
        transaction: TransactionConfirmation) {

        if (!_.isNil(from.chainId)) {
            this.from = from.chainId;
        }

        if (!_.isNil(from.chainName)) {
            this.from = from.chainName;
        }

        if (!_.isNil(to.chainId)) {
            this.to = to.chainId;
        }

        if (!_.isNil(to.chainName)) {
            this.to = to.chainName;
        }

        this.amount = amount;
        this.transaction = transaction;
    }
}
