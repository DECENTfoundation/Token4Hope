import { injectable } from "inversify";

import { Payment } from "../../models/payment";
import { RestGateway } from "../base/rest";
import { Rest } from "../base/rest/decorators";
import { RestAuth } from "../base/rest/RestAuth";
import { RestMethod } from "../base/rest/RestMethod";
import { RestService } from "../base/rest/RestService";

@Rest({
    gateway: RestGateway.Default,
    routes:  {
        [ RestMethod.Create ]: { path: "/family/payInStore", authorized: RestAuth.Bearer },
    },
})
@injectable()
export class PaymentService extends RestService<Payment> {

}
