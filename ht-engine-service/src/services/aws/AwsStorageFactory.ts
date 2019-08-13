import * as AWS from "aws-sdk";
import * as Hapi from "hapi";

export type AwsStorageFactory = (source: Hapi.Request, storage: string) => AWS.S3;
