import * as Hapi from "hapi";
import { Assembly } from "./Assembly";

export type AssemblyFactory = (source: Hapi.Server | Hapi.Request) => Assembly;
