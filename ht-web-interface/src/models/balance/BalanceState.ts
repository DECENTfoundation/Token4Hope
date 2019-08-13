import { ExposeError, ExposeLoading } from "../../utils/expose";
import { ExposeCompletition } from "../../utils/expose/ExposeCompletition";
import { Balance } from "./Balance";

export interface BalanceState extends ExposeError, ExposeLoading, ExposeCompletition {
    data?: Balance;
}
