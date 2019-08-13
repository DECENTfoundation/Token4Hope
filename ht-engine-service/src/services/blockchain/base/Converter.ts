import { Decimal } from "decimal.js";
import Long = require("long");

export class Converter {

    public static decimalToSatoshi(decimalNumber: string, precision: number): Long {
        let decimal = new Decimal(decimalNumber);

        for (let index = 0; index < precision; index++) {
            decimal = decimal.times(10);
        }

        return Long.fromString(decimal.toFixed(0));
    }

    public static satoshiToDecimal(satoshi: Long, precision: number): string {
        let decimal = new Decimal(satoshi.toString());

        for (let index = 0; index < precision; index++) {
            decimal = decimal.div(10);
        }

        return decimal.toFixed(precision);
    }
}
