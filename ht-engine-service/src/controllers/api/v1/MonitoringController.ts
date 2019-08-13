import * as Hapi from "hapi";
import * as HttpStatus from "http-status-codes";
import { injectable } from "inversify";

import { User } from "../../../models/entities/User";
import { BaseController } from "../../base/BaseController";

@injectable()
export class MonitoringController extends BaseController<User> {

    public async healthcheck(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return helper.response().code(HttpStatus.OK);
    }
}
