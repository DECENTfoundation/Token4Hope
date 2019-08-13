import * as Moment from "moment";

import { DateFormat } from "./DateFormat";

export class DateUtils {
    public static format(timeValue: Moment.MomentInput , formatType: string = DateFormat.default): string {
        return  Moment(timeValue).format(formatType);
    }

    public static getFromNow(timeValue: Moment.MomentInput): string {
        return Moment(timeValue).fromNow();
    }
}
