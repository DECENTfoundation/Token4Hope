import * as Catbox from "catbox";
import * as Hapi from "hapi";

import { inject, injectable } from "inversify";

import { SessionFactory, SessionOptions, SessionPoolPolicy } from "../../plugins/session";
import { CompositeKey } from "../../utils/foundation";

import { SessionCredentials, SessionIdentity } from "./artifacts";

@injectable()
export class SessionService {

    @inject("Factory<Session>")
    private sessionFactory: SessionFactory;

    public async create(request: Hapi.Request, identity: SessionIdentity, ttl: number = 0): Promise<void> {
        const policy = this.getSessionPool(request, identity.credentials.pool);
        policy.set(CompositeKey(identity.credentials.id, identity.credentials.sub), identity, ttl);
    }

    public async delete(request: Hapi.Request): Promise<void> {
        const credentials = request.auth.credentials as SessionCredentials;
        const policy = this.getSessionPool(request, credentials.pool);

        return await policy.drop(CompositeKey(credentials.id, credentials.sub));
    }

    public async getSessionIdentity(request: Hapi.Request): Promise<SessionIdentity> {
        const credentials = request.auth.credentials as SessionCredentials;
        const session = await this.getSession(request, credentials.pool, credentials.id, credentials.sub);
        return (session || {}) as SessionIdentity;
    }

    public async getSession(
        request: Hapi.Request,
        policy: string | SessionPoolPolicy,
        ...args: any[]): Promise<Catbox.PolicyGetPromiseResult> {
        const pool = this.getSessionPool(request, policy);
        return await pool.get(CompositeKey(...args));
    }

    protected getSessionPool(request: Hapi.Request, policy: string | SessionPoolPolicy): Catbox.Policy {
        return this.sessionFactory(request).getPool(policy);
    }

    protected getSessionOptions(request: Hapi.Request): SessionOptions {
        return this.sessionFactory(request).getOptions();
    }

    protected flush(request: Hapi.Request): void {
        return this.sessionFactory(request).flush();
    }
}
