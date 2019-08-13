import Decimal from "decimal.js";

export const parseDecimal = (value: string | number) => parseFloat(new Decimal(value).toString()).toLocaleString("sk");
