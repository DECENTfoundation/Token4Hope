
import * as Hapi from "hapi";

import { RouteOwner } from "./RouteOwner";
import { Router } from "./Router";

export type RouterFactory = (source: Hapi.Server | Hapi.Request, owner?: RouteOwner) => Router;
