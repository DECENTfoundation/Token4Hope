import { ObjectKeyLiteral } from "../../utils/foundation/class";

export interface Status {
    message?: string;
    status?: number;
    key?: string;
    values?: ObjectKeyLiteral;
}
