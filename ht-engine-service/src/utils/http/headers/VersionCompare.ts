import { ComparisonResult } from "../../foundation";

export const VersionCompare = (left: string, right: string): ComparisonResult => {

    /**
     * https://github.com/omichelsen/compare-versions
     *
     * compareVersions('10.1.8', '10.0.4'); //  1
     * compareVersions('10.0.1', '10.0.1'); //  0
     * compareVersions('10.1.1', '10.2.2'); // -1
     *
     */

    const compare = require("compare-versions");
    return compare(left, right);
};
