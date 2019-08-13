import { ClassName } from "../../../utils/react";

import { BalanceType } from "./BalanceType";

export interface BalanceProps extends ClassName {
    type: BalanceType;
    token?: boolean;
    value: string | null;
}
