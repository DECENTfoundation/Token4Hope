import * as Hapi from "hapi";

import { inject, injectable, named } from "inversify";

import { AuthScopeFactory } from "../../../plugins/auth";
import {
    BlockchainFactory,
    BlockchainOptions,
    BlockchainTransport,
    BlockchainTransportFactory,
} from "../../../plugins/blockchain";

@injectable()
export abstract class BaseBlockchainService {

    @inject("Factory<DCoreApi>")
    @named(BlockchainTransport.Http)
    protected httpFactory: BlockchainTransportFactory;

    @inject("Factory<DCoreApi>")
    @named(BlockchainTransport.Socket)
    protected socketFactory: BlockchainTransportFactory;

    @inject("Factory<AuthScope>")
    protected auth: AuthScopeFactory;

    @inject("Factory<Blockchain>")
    private blockchain: BlockchainFactory;

    public getOptionsUsingRequest(request: Hapi.Request): BlockchainOptions {
        return this.blockchain(request).getOptions();
    }

}
