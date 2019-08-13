import * as React from "react";

import { VerticalFlow } from "../flow/vertical";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import { ContainerProps } from "./ContainerProps";

import "./styles.scss";

export const Container = ({className, children, fullWidth, offset}: ContainerProps) => {
    return (
        <VerticalFlow className={renderClassConditions("container", { "full-width": fullWidth, offset }, className)} spacing="center">
            <VerticalFlow className="container__wrapper" spacing="center">
                {children}
           </VerticalFlow>
        </VerticalFlow>
    );
};
