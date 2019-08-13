import * as React from "react";

import { Text } from "../text";

import { renderClass } from "../../../helpers/classes/ClassRenderer";

import { LabelProps } from "./LabelProps";

import "./styles.scss";

export const Label = ({ label, required, className }: LabelProps) => {
    return (
        <Text className={renderClass("label", className)}>
            {label}
            {required && <span className="label__asterisks"> *</span>}
        </Text>
    );
};
