
import * as _ from "lodash";
import { Moment } from "moment";

import { AwsPolicy, AwsPolicyStatement } from "./AwsPolicy";

export class AwsPolicyFactory {

    public static buildPolicy(resource: string, expire: Moment, address?: string): AwsPolicy {
        return {
            Statement: [{
                Condition: {
                    DateLessThan: {
                        ["AWS:EpochTime"]: expire.unix(),
                    },
                    IpAddress: !_.isNil(address) ? {
                        ["AWS:SourceIp"]: address,
                    } : undefined,
                }, Resource: resource,
            } as AwsPolicyStatement],
        } as AwsPolicy;
    }
}
