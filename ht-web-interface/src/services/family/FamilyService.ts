import { injectable } from "inversify";

import { Family } from "../../models/family";
import { RestGateway } from "../base/rest";
import { Rest } from "../base/rest/decorators";
import { RestAuth } from "../base/rest/RestAuth";
import { RestMethod } from "../base/rest/RestMethod";
import { RestService } from "../base/rest/RestService";

@Rest({
    gateway: RestGateway.Default,
    routes:  {
        [ RestMethod.Create ]: { path: "/family", authorized: RestAuth.Bearer },
        [ RestMethod.Edit ]:   { path: "/family/:cardNumber", authorized: RestAuth.Bearer },
    },
})
@injectable()
export class FamilyService extends RestService<Family> {

}
