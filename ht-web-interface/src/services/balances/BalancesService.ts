import { injectable } from "inversify";

import { Balances } from "../../models/balances";
import { RestGateway } from "../base/rest";
import { Rest } from "../base/rest/decorators";
import { RestAuth } from "../base/rest/RestAuth";
import { RestMethod } from "../base/rest/RestMethod";
import { RestService } from "../base/rest/RestService";

@Rest({
    gateway: RestGateway.Default,
    routes:  {
        [RestMethod.Show]: { path: "/accounts", authorized: RestAuth.Bearer },
    },
})
@injectable()
export class BalancesService extends RestService<Balances> {

}
