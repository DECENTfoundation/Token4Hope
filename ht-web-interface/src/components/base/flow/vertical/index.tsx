import * as React from "react";

import { VerticalFlowStateProps } from "./VerticalFlowStateProps";

import "./styles.scss";

export const VerticalFlow = ({ spacing, verticalAlign, fullWidth, style, className, children }: VerticalFlowStateProps) => {
    const styles = {
        alignItems: spacing || "flex-start",
        justifyContent: verticalAlign || "flex-start",
        width: fullWidth ? "100%" : null,
    };
    return (
        <div style={{ ...styles, ...style }} className={`${className || ""} vertical-flow`}>
            {children}
        </div>
    );
};
