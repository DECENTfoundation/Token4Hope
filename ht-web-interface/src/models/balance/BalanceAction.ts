import { Action } from "../../utils/redux";
import { Balance } from "./Balance";
import { BalanceEvent } from "./BalanceEvent";

export class BalanceAction {

    public static resetBalance(): Action {
        return { type: BalanceEvent.Reset };
    }

    public static getBalanceByCard(payload: Balance): Action<Balance> {
        return { type: BalanceEvent.ShowByCard, payload };
    }

    public static getBalanceByChain(payload: Balance): Action<Balance> {
        return { type: BalanceEvent.ShowByChain, payload };
    }
}
