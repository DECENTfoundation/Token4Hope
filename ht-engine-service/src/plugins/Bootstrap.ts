import * as Hapi from "hapi";
import * as _ from "lodash";

import { ContainerModule, interfaces } from "inversify";

import { Plugin, PluginUtils } from "../utils/plugin";

import { Assembly } from "./assembly";
import { Auth, AuthFactory, AuthSchemeType, AuthScope, AuthStrategy, AuthStrategyType } from "./auth";
import { Aws } from "./aws";
import { Blockchain } from "./blockchain";
import { InitialSeedExecuter, InitialSeedType } from "./initial-seed";
import { Orm } from "./orm";
import { RateLimiter } from "./rate-limiter/RateLimiter";
import { RouteInject, RouteLink, RouteOwner, Router } from "./router";
import { Session } from "./session";
import { JoiBuilderFactory } from "./validation";

export const Bootstrap = (): ContainerModule => {
    return new ContainerModule((bind) => {

        // Orm

        bind<interfaces.Factory<Orm>>("Factory<Orm>").toFactory<Orm>((context) => {
            return ((source: Hapi.Server | Hapi.Request): Orm => PluginUtils.resolve<Orm>(source, Plugin.Orm));
        });

        // Aws

        bind<interfaces.Factory<Aws>>("Factory<Aws>").toFactory<Aws>((context) => {
            return ((source: Hapi.Server | Hapi.Request): Aws => PluginUtils.resolve<Aws>(source, Plugin.Aws));
        });

        // Assembly

        bind<interfaces.Factory<Assembly>>("Factory<Assembly>").toFactory<Assembly>((context) => {
            return ((source: Hapi.Server | Hapi.Request): Assembly => PluginUtils.resolve<Assembly>(source, Plugin.Assembly));
        });

        // Session

        bind<interfaces.Factory<Session>>("Factory<Session>").toFactory<Session>((context) => {
            return ((source: Hapi.Server | Hapi.Request): Session => PluginUtils.resolve<Session>(source, Plugin.Session));
        });

        // Rate Limiter

        bind<interfaces.Factory<RateLimiter>>("Factory<RateLimiter>").toFactory<RateLimiter>((context) => {
            return ((source: Hapi.Server | Hapi.Request): RateLimiter => PluginUtils.resolve<RateLimiter>(source, Plugin.RateLimiter));
        });

        // Auth

        bind<interfaces.Factory<Auth>>("Factory<Auth>").toFactory<Auth>((context) => {
            return ((source: Hapi.Server | Hapi.Request): Auth => PluginUtils.resolve<Auth>(source, Plugin.Auth));
        });
        bind<interfaces.Factory<AuthScope>>("Factory<AuthScope>").toFactory<AuthScope>((context) => {
            return ((source: Hapi.Server | Hapi.Request): AuthScope => {
                const auth = context.container.get<AuthFactory>("Factory<Auth>");
                return auth(source).getScope(source);
            });
        });
        bind<interfaces.Factory<AuthStrategy>>("Factory<AuthStrategy>").toFactory<AuthStrategy>((context) => {
            return ((type: AuthStrategyType): AuthStrategy => {
                return context.container.getNamed("AuthStrategy", type.toString());
            });
        });
        bind<interfaces.Factory<InitialSeedExecuter>>("Factory<InitialSeedExecuter>").toFactory<InitialSeedExecuter>((context) => {
            return ((type: InitialSeedType): InitialSeedExecuter => {
                return context.container.getNamed("InitialSeedExecuter", type.toString());
            });
        });
        bind<interfaces.Factory<Hapi.ServerAuthScheme>>("Factory<ServerAuthScheme>").toFactory<Hapi.ServerAuthScheme>((context) => {
            return ((type: AuthSchemeType): Hapi.ServerAuthScheme => {
                return context.container.getNamed<Hapi.ServerAuthScheme>("ServerAuthScheme", type.toString());
            });
        });

        // Blockchain

        bind<interfaces.Factory<Blockchain>>("Factory<Blockchain>").toFactory<Blockchain>((context) => {
            return ((source: Hapi.Server | Hapi.Request): Blockchain => PluginUtils.resolve<Blockchain>(source, Plugin.Blockchain));
        });

        // Router

        bind<interfaces.Factory<Router>>("Factory<Router>").toFactory<Router>((context) => {
            return ((source: Hapi.Server | Hapi.Request, owner?: RouteOwner): Router => {
                if (!_.isUndefined(owner)) {
                    return _.get(source, owner) as Router;
                }
                return PluginUtils.resolve<Router>(source, Plugin.Routing);
            });
        });

        bind<interfaces.Factory<RouteInject>>("Factory<RouteInject>").toFactory<RouteInject>((context) => {
            return ((source: Hapi.Request, linked: RouteLink, options?: Hapi.ServerInjectOptions): RouteInject => {
                const Internal = context.container.get<interfaces.Newable<RouteInject>>("Newable<RouteInject>");
                return new Internal(source, linked, options);
            });
        });

        bind<JoiBuilderFactory>("JoiBuilder").toConstantValue(new JoiBuilderFactory());
    });
};
