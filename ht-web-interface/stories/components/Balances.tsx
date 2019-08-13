import * as React from "react";

import { Balance } from "../../src/components/items/balance";
import { BalanceType } from "../../src/components/items/balance/BalanceType";

export const Balances = () => {
    return (
        <div className="storybook__wrapper">
            <Balance type={BalanceType.Primary} value={"1213"}/>
            <Balance type={BalanceType.Secondary} value={"1213"}/>
        </div>
    );
};
