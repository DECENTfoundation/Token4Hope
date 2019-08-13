import { injectable } from "inversify";

import { Transactions } from "../../models/transactions";
import { RestAuth, RestGateway } from "../base/rest";
import { Rest } from "../base/rest/decorators";
import { RestMethod } from "../base/rest/RestMethod";
import { RestService } from "../base/rest/RestService";

@Rest({
    gateway: RestGateway.Default,
    routes:  {
        [RestMethod.Show]: { path: "/accounts/:chainName/transactions", authorized: RestAuth.Bearer },
    },
})
@injectable()
export class TransactionsService extends RestService<Transactions> {

}
