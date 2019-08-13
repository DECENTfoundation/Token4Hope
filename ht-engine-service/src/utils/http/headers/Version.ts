import * as _ from "lodash";
import { Spec } from "swagger-schema-official";

import { ComparisonResult } from "../../foundation";
import { VersionCompare } from "./VersionCompare";

export class Version {
    public major: number = 1;
    public minor: number = 0;

    constructor(source: Spec | string) {
        const [major, minor] = this.parse(_.isString(source) ? source : source.info.version);

        this.major = major;
        this.minor = minor;
    }

    public compare(other: Version): ComparisonResult {
        return VersionCompare(this.toString(), other.toString());
    }

    public toString(): string {
        return `${this.major}.${this.minor}`;
    }

    private parse(value?: string): [number, number] {
        if (_.isNil(value)) {
            return [this.major, this.minor];
        }
        const size = 2;
        const pattern = /\d+/g;
        const result = _.take(value.match(pattern), size);
        if (_.isNull(result) || _.isEmpty(result)) {
            return this.parse();
        }

        if (result.length === size) {
            return [_.parseInt(_.first(result)), _.parseInt(_.last(result))];
        }

        return [_.parseInt(_.first(result)), this.minor];
    }
}
