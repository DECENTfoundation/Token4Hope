
import * as Hapi from "hapi";
import * as Jwt from "jsonwebtoken";

import { injectable } from "inversify";

import { User } from "../../../models/entities/User";
import { KeyPairDto } from "../../../models/transfer-objects/KeyPairDto";
import { CryptoUtils } from "../../../utils/foundation";
import { SessionCredentials } from "../../session/artifacts";
import { BaseAuthSessionService } from "../base/BaseAuthSessionService";

@injectable()
export class JwtAuthSessionService extends BaseAuthSessionService<User> {

    public async signin(request: Hapi.Request, user: User): Promise<string> {
        const credentials = { id: user.id, pool: user.pool, sub: CryptoUtils.token() } as SessionCredentials;
        const auth = this.getAuthOptions(request);
        const token = Jwt.sign(credentials, auth.secret, auth.jwt.signing);
        const organizationKey = user.organization.chainEntity.key.toTransferObject<KeyPairDto>().toPayload();

        await this.create(request, {
            artifacts: { organizationKey },
            credentials: { ...credentials, scope: user.acl },
        });

        return token;
    }

    public async refresh(
        request: Hapi.Request,
        user: User,
    ): Promise<void> {
        await this.create(request, {
            artifacts: { ...request.auth.artifacts },
            credentials: { ...request.auth.credentials, scope: user.acl },
        });
    }
}
