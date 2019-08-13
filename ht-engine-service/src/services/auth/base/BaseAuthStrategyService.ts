import * as Boom from "boom";
import * as Hapi from "hapi";

import { inject, injectable } from "inversify";

import { AuthFactory, AuthOptions, AuthStrategy } from "../../../plugins/auth";
import { ObjectExpose } from "../../../utils/foundation/class";
import { RenderUtils } from "../../../utils/render";
import { SessionService } from "../../session";

@injectable()
export abstract class BaseAuthStrategyService<Input = {}, Output = {}> extends SessionService implements AuthStrategy<Input, Output> {

    public readonly strategy: ObjectExpose<this> = { exposed: this };

    @inject("Factory<Auth>")
    protected authFactory: AuthFactory;

    public async authenticate(request: Hapi.Request, data: Input, helper: Hapi.ResponseToolkit): Promise<Output> {
        throw RenderUtils.renderError(Boom.unauthorized());
    }

    protected getAuthOptions(request: Hapi.Request): AuthOptions {
        return this.authFactory(request).getOptions();
    }
}
