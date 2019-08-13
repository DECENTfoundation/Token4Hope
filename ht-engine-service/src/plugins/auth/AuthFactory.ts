
import * as Hapi from "hapi";
import { Auth } from "./Auth";

export type AuthFactory = (source: Hapi.Server | Hapi.Request) => Auth;
