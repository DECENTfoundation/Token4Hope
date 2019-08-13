import { ClassName } from "../../../utils/react";

import { ButtonType } from "../../base/button/ButtonType";

export interface ChevronProps extends ClassName {
    type: ButtonType;
    disabled?: boolean;
}
