import { AccountState } from "../account";
import { BalanceState } from "../balance";
import { BalancesState } from "../balances";
import { ErrorState } from "../error";
import { FamilyState } from "../family";
import { PaymentState } from "../payment";
import { SessionState } from "../session";
import { SuccessState } from "../success";
import { TransactionsState } from "../transactions";

export interface ContextState {
    session: SessionState;
    balance: BalanceState;
    balances: BalancesState;
    transactions: TransactionsState;
    account: AccountState;
    error: ErrorState;
    success: SuccessState;
    family: FamilyState;
    payment: PaymentState;
}
