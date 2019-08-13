import { ObjectKeyLiteral } from "../../utils/foundation/class";
import { Paginable } from "../../utils/pagination";

export interface Transactions extends Paginable {
    balance?: string;
    tokensReceived?: string;
    tokensSent?: string;
    found?: boolean;
    direction?: string;
    transactions?: ObjectKeyLiteral[];
}
