import { SizeUnit } from "./";

export class SizeUtils {

    public static getIndex(unit: SizeUnit) {
        const index = [SizeUnit.KB, SizeUnit.MB, SizeUnit.GB].indexOf(unit);
        if (index > 0) {
            return index;
        } else {
            return 1;
        }
    }

    public static sizeInBytes(unitSize: number, unit: SizeUnit) {
        return unitSize * Math.pow(1024, (this.getIndex(unit) + 1));
    }

    public static formatSize(fileSizeInBytes: number, unit: SizeUnit) {
        if (fileSizeInBytes > 0) {
            return parseFloat((fileSizeInBytes / Math.pow(1024, this.getIndex(unit) + 1)).toFixed(1));
        }
        return null;
    }
}
