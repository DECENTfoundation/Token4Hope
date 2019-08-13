import * as Hapi from "hapi";
import * as Jwt from "jsonwebtoken";

import { AuthOptions, AuthStrategy } from "../../../plugins/auth";
import { SessionIdentity } from "../../session/artifacts";

// tslint:disable-next-line:max-line-length
export interface JwtAuthOptions extends AuthOptions, AuthStrategy<string, SessionIdentity & Hapi.AuthenticationData>, Hapi.ServerAuthSchemeOptions {
    jwt?: {
        signing: Jwt.SignOptions;
        verify?: Jwt.VerifyOptions;
    };
}
