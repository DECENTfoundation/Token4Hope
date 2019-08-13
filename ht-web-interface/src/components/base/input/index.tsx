import * as React from "react";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import { InputProps } from "./InputProps";

import "./styles.scss";

export const Input = ({ invalid, className, onChange, resetError, ...rest }: InputProps) => {
    const handleOnChange = (e: any) => {
        if (invalid && resetError) {
            resetError();
        }
        onChange(e.target.value);
    };

    return (
        <input
            {...rest}
            onChange={handleOnChange}
            className={renderClassConditions("input", { invalid }, className)}
        />
    );
};
