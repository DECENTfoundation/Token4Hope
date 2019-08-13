import * as Hapi from "hapi";
import { Orm } from "./Orm";

export type OrmFactory = (source: Hapi.Server | Hapi.Request) => Orm;
