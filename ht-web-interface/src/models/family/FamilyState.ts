import { ExposeError, ExposeLoading } from "../../utils/expose";
import { ExposeCompletition } from "../../utils/expose/ExposeCompletition";
import { Family } from "./Family";

export interface FamilyState extends ExposeError, ExposeLoading, ExposeCompletition {
    data?: Family;
}
