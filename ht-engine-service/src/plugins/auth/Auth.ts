
import * as Hapi from "hapi";
import { AuthOptions } from "./AuthOptions";
import { AuthScope } from "./AuthScope";

export interface Auth {
    getScope(source: Hapi.Server | Hapi.Request): AuthScope;
    getOptions(): AuthOptions;
}
