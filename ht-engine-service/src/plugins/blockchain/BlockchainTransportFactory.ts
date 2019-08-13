import * as Hapi from "hapi";

import { DCoreApi } from "dcorejs-sdk";

export type BlockchainTransportFactory = (source: Hapi.Server | Hapi.Request) => DCoreApi;
