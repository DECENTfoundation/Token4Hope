import * as _ from "lodash";
import * as React from "react";

import { HorizontalFlow } from "../../base/flow/horizontal";
import { Text } from "../../base/text";
import { Loader } from "../loader";

import { renderClass } from "../../../helpers/classes/ClassRenderer";
import { parseDecimal } from "../../../utils/decimal";

import { BalanceProps } from "./BalanceProps";
import { BalanceType } from "./BalanceType";

import "./styles.scss";

export const Balance = ({ type, value, className, token }: BalanceProps) => {
    const primary = type === BalanceType.Primary;
    const renderAmount = (amount: string) => <span>{parseDecimal(amount)}</span>;
    return (
        <HorizontalFlow className={renderClass("balance", className)} verticalAlign="flex-start" spacing="flex-start">
            <Text className={`balance__value balance__value--${type}`} type={primary ? "h1" : "h2"}>
                {!_.isNil(value) ? renderAmount(value) : <Loader className="balance__value__loader" loading={true}/>}
            </Text>
            <Text className={`balance__currency balance__currency--${type}`} type="h4">{token ? "Tokens" : "T4H"}</Text>
        </HorizontalFlow>
    );
};
