import { ExposeError, ExposeLoading } from "../../utils/expose";
import { Transactions } from "./Transactions";

export interface TransactionsState extends ExposeError, ExposeLoading {
    data?: Transactions;
}
