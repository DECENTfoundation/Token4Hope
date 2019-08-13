import * as MomentFactory from "moment";
import { isDate, isMoment } from "moment";

export const DateTransformerHelper = (value: any): any => {
    if (isMoment(value)) {
        return MomentFactory(value).toDate();
    }

    if (isDate(value)) {
        return value;
    }
    return MomentFactory(value).toDate();
};
