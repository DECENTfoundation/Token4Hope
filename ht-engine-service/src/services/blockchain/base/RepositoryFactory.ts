import * as Hapi from "hapi";

import { BlockchainStrategy } from "../../../plugins/blockchain/BlockchainStrategy";
import { BaseRepositoryService } from "./BaseRepositoryService";

// tslint:disable-next-line:max-line-length
export type RepositoryFactory<R extends BaseRepositoryService, T extends BlockchainStrategy> = (request: Hapi.Request, model: BlockchainStrategy) => R;
