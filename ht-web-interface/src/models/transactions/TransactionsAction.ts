import { ListQuery } from "../../utils/data";
import { Action } from "../../utils/redux";

import { Account } from "../account";

import { TransactionsEvent } from "./TransactionsEvent";

export class TransactionsAction {

    public static showTransactions(payload: ListQuery<Account>): Action<Account> {
        return { type: TransactionsEvent.Show, payload };
    }

    public static resetTransactions(): Action {
        return { type: TransactionsEvent.Reset };
    }

    public static resetCursors(): Action {
        return { type: TransactionsEvent.ResetCursors };
    }
}
