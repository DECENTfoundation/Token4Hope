import * as Hapi from "hapi";
import { AuthScope } from "./AuthScope";

export type AuthScopeFactory = (source: Hapi.Server | Hapi.Request) => AuthScope;
