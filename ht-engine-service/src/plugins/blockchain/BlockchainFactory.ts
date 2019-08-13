
import * as Hapi from "hapi";
import { Blockchain } from "./Blockchain";

export type BlockchainFactory = (source: Hapi.Server | Hapi.Request) => Blockchain;
