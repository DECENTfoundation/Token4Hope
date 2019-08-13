import * as Hapi from "hapi";
import { inject, injectable } from "inversify";

import { SessionPoolPolicy } from "../../plugins/session";
import { ObjectCheckOf } from "../../utils/foundation/class/ObjectCheck";
import { Payload } from "../../utils/payload";
import { SessionIdentity } from "../session/artifacts/SessionIdentity";
import { SessionService } from "../session/SessionService";

@injectable()
export class UserCacheService {

    @inject(SessionService)
    private sessionService: SessionService;

    public async getData(request: Hapi.Request, pool: SessionPoolPolicy) {
        const credentials = request.auth.credentials as Payload;
        const result = await this.sessionService.getSession(request, pool, credentials.id, credentials.sub);

        if (!ObjectCheckOf<SessionIdentity>(result, "artifacts")) {
            throw new Error("Unknown artifacts!");
        }

        return result.artifacts;
    }

    public async setData(request: Hapi.Request, fieldName: string, data: any) {
        const credentials = request.auth.credentials;
        const artifacts = request.auth.artifacts;
        const mergedData = {
            artifacts: { ...artifacts, [fieldName]: data },
            credentials,
        };

        await this.sessionService.create(request, mergedData);
    }
}
