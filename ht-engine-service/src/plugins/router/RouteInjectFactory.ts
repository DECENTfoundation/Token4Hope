import * as Hapi from "hapi";
import { RouteInject } from "./RouteInject";
import { RouteLink } from "./RouteLink";

export type RouteInjectFactory = (source: Hapi.Request, linked: RouteLink, options?: Hapi.ServerInjectOptions) => RouteInject;
