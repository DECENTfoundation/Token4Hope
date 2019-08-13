import { ObjectKeyLiteral } from "../../utils/foundation/class";

export interface RouteParameterItem {
    in: string;
    name: string;
    type: string;
    required: boolean;
    allowEmptyValue: boolean;
    properties: ObjectKeyLiteral;
    format?: string;
    schema?: RouteParameterItem;
    items: RouteParameterItem;
}
