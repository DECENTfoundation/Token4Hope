
import * as Hapi from "hapi";

import { AuthSchemeType } from "./AuthSchemeType";

export type AuthSchemeFactory = (type: AuthSchemeType) => Hapi.ServerAuthScheme;
