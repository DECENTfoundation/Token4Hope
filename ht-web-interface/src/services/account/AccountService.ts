import { injectable } from "inversify";

import { Account } from "../../models/account";
import { RestGateway } from "../base/rest";
import { Rest } from "../base/rest/decorators";
import { RestAuth } from "../base/rest/RestAuth";
import { RestMethod } from "../base/rest/RestMethod";
import { RestService } from "../base/rest/RestService";

@Rest({
    gateway: RestGateway.Default,
    routes:  {
        [ RestMethod.Show ]: { path: "/user/me", authorized: RestAuth.Bearer },
        [ RestMethod.Edit ]: { path: "/user/me", authorized: RestAuth.Bearer },
    },
})
@injectable()
export class AccountService extends RestService<Account> {

}
