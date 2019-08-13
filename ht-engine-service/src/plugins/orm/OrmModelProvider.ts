import * as Hapi from "hapi";
import { OrmQuery } from "./OrmQuery";

export interface OrmQueryTarget { readonly target: string; }
export type OrmModelProvider = <T> (source: Hapi.Request, ...args: any[]) => Promise<T>;
export type OrmQueryFactory = (query: OrmQuery, target: OrmQueryTarget) => OrmModelProvider;
