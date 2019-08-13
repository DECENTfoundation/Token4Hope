import * as Hapi from "hapi";
import { Session } from "./Session";

export type SessionFactory = (source: Hapi.Server | Hapi.Request) => Session;
