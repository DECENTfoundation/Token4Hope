import * as AWS from "aws-sdk";
import * as Hapi from "hapi";

export type AwsCloudfrontProvider = (source: Hapi.Request, storage: string) => Promise<AWS.CloudFront.Signer>;
export type AwsCloudfrontKeyProvider = (source: Hapi.Request, storage: string) => Promise<string>;
