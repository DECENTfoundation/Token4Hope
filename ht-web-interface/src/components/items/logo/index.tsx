import * as React from "react";

import { renderClass } from "../../../helpers/classes/ClassRenderer";
import { ClassName } from "../../../utils/react";

const logo = require("./images/logo.svg");

export const Logo = ({ className }: ClassName) => {
    return (
        <img src={logo} className={renderClass("logo", className)}/>
    );
};
