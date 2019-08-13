import * as Hapi from "hapi";

import { inject, injectable } from "inversify";

import { NonAbstractTypeOfModel } from "sequelize-typescript/lib/models/Model";
import { BaseAuthModel } from "../../../models/base/entities/BaseAuthModel";
import { AuthFactory, AuthOptions } from "../../../plugins/auth";
import { SessionService } from "../../session";
import { SessionCredentials } from "../../session/artifacts";

@injectable()
export abstract class BaseAuthSessionService<T extends BaseAuthModel<T>> extends SessionService {

    @inject("Factory<Auth>")
    protected authFactory: AuthFactory;

    public abstract async signin(
        request: Hapi.Request,
        account: BaseAuthModel<T>,
    ): Promise<string>;

    public async abstract refresh(
        request: Hapi.Request,
        account: BaseAuthModel<T>,
    ): Promise<void>;

    public async signout(request: Hapi.Request): Promise<void> {
        await this.delete(request);
    }

    public async account(
        request: Hapi.Request,
        account: NonAbstractTypeOfModel<T>,
    ): Promise<T> {
        const credentials = request.auth.credentials as SessionCredentials;
        return await account.findByPrimary(credentials.id) as T;
    }

    protected getAuthOptions(request: Hapi.Request): AuthOptions {
        return this.authFactory(request).getOptions();
    }
}
