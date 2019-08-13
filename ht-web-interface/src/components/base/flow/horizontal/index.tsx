import * as React from "react";

import { HorizontalFlowProps } from "./HorizontalFlowProps";

import "./styles.scss";

export const HorizontalFlow = ( { verticalAlign, wrap, spacing, fullWidth, className, children, style, onClick }: HorizontalFlowProps) => {
    const styles = {
      alignItems: verticalAlign || "center",
      flexWrap: wrap || "nowrap",
      justifyContent: spacing || "space-between",
      width: fullWidth ? "100%" : null,
    };
    return (
      <div className={`${className || ""} horizontal-flow`} onClick={onClick || null} style={{ ...styles, ...style }}>
        {children}
      </div>
    );
};
