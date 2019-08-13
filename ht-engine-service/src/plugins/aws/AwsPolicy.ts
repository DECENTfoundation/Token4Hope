import { ObjectKeyLiteral } from "../../utils/foundation/class";

export type AwsPolicyStatement = ObjectKeyLiteral & {
    ["Resource"]: string;
    ["Condition"]?: {
        ["DateLessThan"]?: {
            ["AWS:EpochTime"]: number;
        },
        ["IpAddress"]?: {
            ["AWS:SourceIp"]: string;
        },
    },
};

export type AwsPolicy = ObjectKeyLiteral & {
    ["Statement"]: AwsPolicyStatement[],
};
