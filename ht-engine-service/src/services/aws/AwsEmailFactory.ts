import * as AWS from "aws-sdk";
import * as Hapi from "hapi";

export type AwsEmailFactory = (source: Hapi.Request) => AWS.SES;
