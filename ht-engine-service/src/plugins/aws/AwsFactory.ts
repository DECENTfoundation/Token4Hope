
import * as Hapi from "hapi";
import { Aws } from "./Aws";

export type AwsFactory = (source: Hapi.Server | Hapi.Request) => Aws;
