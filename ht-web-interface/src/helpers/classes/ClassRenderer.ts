import { each } from "lodash";

import { ObjectKeyLiteral } from "../../utils/foundation/class";

export const renderClass = (baseClass: string, className: string) => {
    return className ? [baseClass, className].join(" ") : baseClass;
};

export const renderClassConditions = (baseClass: string, conditions: ObjectKeyLiteral, className?: string ) => {
    const classes = className ? [baseClass, className] : [baseClass];
    each(conditions, (condition, key) => condition && classes.push(`${baseClass}--${key}`));
    return classes.join(" ");
};
