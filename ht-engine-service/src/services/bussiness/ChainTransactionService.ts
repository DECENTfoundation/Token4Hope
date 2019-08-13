import { injectable } from "inversify";

import { ChainTransaction } from "../../models/entities/ChainTransaction";
import { User } from "../../models/entities/User";
import { TransactionResult } from "../blockchain/common/TransactionResult";

@injectable()
export class ChainTransactionService {

    public async log(transactionResult: TransactionResult, initiator: User) {
        const createdTransaction = await ChainTransaction.create({
            amount: transactionResult.amount,
            receiver: transactionResult.to,
            sender: transactionResult.from,
            transactionId: transactionResult.transaction.id,
        });

        await createdTransaction.$set("user", initiator);
    }
}
