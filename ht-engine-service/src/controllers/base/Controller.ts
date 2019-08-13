import * as Hapi from "hapi";
import { RouteLink } from "../../plugins/router";

export interface Controller {

    linked?: RouteLink;
    getHandler(name: string): Hapi.Lifecycle.Method | null;
}
