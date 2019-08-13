import * as Boom from "boom";
import * as Catbox from "catbox";
import * as Hapi from "hapi";
import * as Jwt from "jsonwebtoken";
import * as _ from "lodash";

import { injectable } from "inversify";

import { ObjectCheckOf } from "../../../utils/foundation/class";
import { RenderUtils } from "../../../utils/render";

import { SessionCredentials, SessionIdentity } from "../../session/artifacts";

import { BaseAuthStrategyService } from "../base/BaseAuthStrategyService";

@injectable()
export class JwtAuthStrategyService extends BaseAuthStrategyService<string, SessionIdentity & Hapi.AuthenticationData> {

    public async authenticate(
        request: Hapi.Request,
        data: string,
        helper: Hapi.ResponseToolkit,
    ): Promise<SessionIdentity & Hapi.AuthenticationData> {

        const options = this.getAuthOptions(request);
        const decoded = Jwt.verify(data, options.secret, options.jwt.verify) as SessionCredentials;
        const result = await this.getSession(request, decoded.pool, decoded.id, decoded.sub);
        if (_.isNil(result)) {
            throw RenderUtils.renderError(Boom.unauthorized());
        }

        if (ObjectCheckOf<Catbox.PolicyGetPromiseResult>(result, "value")) {
            if (_.isNil(result.value) || !_.isUndefined(result.report.error)) {
                throw RenderUtils.renderError(Boom.unauthorized());
            }
            return result.value;
        }

        if (ObjectCheckOf<SessionIdentity & Hapi.AuthenticationData>(result, "credentials")) {
            return result;
        }

        throw RenderUtils.renderError(Boom.unauthorized());
    }
}
