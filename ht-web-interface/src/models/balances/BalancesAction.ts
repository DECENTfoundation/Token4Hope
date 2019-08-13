import { Action } from "../../utils/redux";

import { Balances } from "./Balances";
import { BalancesEvent } from "./BalancesEvent";

export class BalancesAction {

    public static showBalances(): Action<Balances> {
        return { type: BalancesEvent.Show };
    }

    public static resetBalances(): Action {
        return { type: BalancesEvent.Reset };
    }
}
