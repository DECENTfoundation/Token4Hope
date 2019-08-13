
import * as Hapi from "hapi";

import { interfaces } from "inversify";
import { lazyInject } from "../assembly/decorators";

import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";

import { AssemblyFactory } from "../assembly";

import { AuthOptions } from "./AuthOptions";
import { AuthSchemeFactory } from "./AuthSchemeFactory";
import { AuthSchemeType } from "./AuthSchemeType";
import { AuthScope } from "./AuthScope";
import { AuthScopeType } from "./AuthScopeType";
import { AuthStrategyFactory } from "./AuthStrategyFactory";
import { AuthStrategyType } from "./AuthStrategyType";

export class AuthPlugin implements Hapi.PluginBase<AuthOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.Auth;
    public readonly version: string = "1.0.0";
    public readonly dependencies: string[] = [Plugin.Assembly];

    @lazyInject("Factory<Assembly>")
    private assmeblyFactory: AssemblyFactory;

    @lazyInject("Factory<ServerAuthScheme>")
    private schemeFactory: AuthSchemeFactory;

    @lazyInject("Factory<AuthStrategy>")
    private strategyFactory: AuthStrategyFactory;

    private options: AuthOptions;

    public async register(server: Hapi.Server, options: AuthOptions): Promise<void> {

        this.options = options;

        server.auth.scheme(AuthSchemeType.Jwt, this.schemeFactory(AuthSchemeType.Jwt));
        server.auth.strategy(AuthStrategyType.Jwt, AuthSchemeType.Jwt, {
            ...options,
            ...this.strategyFactory<{}>(AuthStrategyType.Jwt),
        });

        // JWT is set as default
        server.auth.default(AuthStrategyType.Jwt);
        server.expose({
            getOptions: (): AuthOptions => this.options,
            getScope: (source: Hapi.Server | Hapi.Request): AuthScope => {

                const container = this.assmeblyFactory(source).getContainer();
                const Scope = container.getNamed<interfaces.Newable<AuthScope>>("Newable<AuthScope>", AuthScopeType.Jwt);
                return new Scope(source);
            },
        });

        server.log([LoggerTag.Info, LoggerTag.Auth], "Authentication plugin registered successfully.");
    }
}
