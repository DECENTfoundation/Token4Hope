import * as React from "react";

import { HorizontalFlow } from "../../base/flow/horizontal";
import { Text } from "../../base/text";

import { renderClass } from "../../../helpers/classes/ClassRenderer";

import { CardNumberProps } from "./CardNumberProps";

import "./styles.scss";

const cardIcon = require("./images/card.svg");

export const CardNumber = ({ cardNumber, className, strong }: CardNumberProps) => {
    return (
        <HorizontalFlow className={renderClass("card-number", className)}>
            <img className="card-number__icon" src={cardIcon}/>
            <Text className="card-number__value" type={strong ? "h3" : "h5"}>
                {[cardNumber.toString().slice(0, 3), cardNumber.toString().slice(3)].join(" ")}
            </Text>
        </HorizontalFlow>
    );
};
