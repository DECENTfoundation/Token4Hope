import * as _ from "lodash";

export class TextUtils {
    public static initials(value: string): string {
        return _.truncate(value, {
            length: 2,
            omission: "",
            separator: "",
        }).toUpperCase();
    }
}
