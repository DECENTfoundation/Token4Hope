import * as AWS from "aws-sdk";
import * as Hapi from "hapi";

export type AwsSignerFactory = (source: Hapi.Request, storage: string, key: string) => AWS.CloudFront.Signer;
