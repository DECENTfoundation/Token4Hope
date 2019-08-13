import { ExposeError, ExposeLoading } from "../../utils/expose";
import { Balances } from "./Balances";

export interface BalancesState extends ExposeError, ExposeLoading {
    data?: Balances;
}
