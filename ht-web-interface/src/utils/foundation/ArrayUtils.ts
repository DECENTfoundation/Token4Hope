import { Decimal } from "decimal.js";
import * as _ from "lodash";

export class ArrayUtils {
    public static at<T extends { name?: string, value?: string }>(collection: T[], key: string): Decimal {
        return new Decimal(_.first(collection.filter(($) => $.name === key)).value);
    }
}
