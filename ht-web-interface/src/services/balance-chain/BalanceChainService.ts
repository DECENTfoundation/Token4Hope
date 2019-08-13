import { injectable } from "inversify";

import { Balance } from "../../models/balance";
import { RestAuth, RestGateway } from "../base/rest";
import { Rest } from "../base/rest/decorators";
import { RestMethod } from "../base/rest/RestMethod";
import { RestService } from "../base/rest/RestService";

@Rest({
    gateway: RestGateway.Default,
    routes:  {
        [ RestMethod.Show ]: { path: "/user/balanceByChainName/:chainName", authorized: RestAuth.Bearer },
    },
})
@injectable()
export class BalanceChainService extends RestService<Balance> {

}
