import * as Boom from "boom";
import * as Hapi from "hapi";

import { injectable } from "inversify";
import { ObjectCheckOf } from "../../../utils/foundation/class";

import { BaseAuthScopeService } from "../base/BaseAuthScopeService";
import { JwtAuthRole } from "./JwtAuthRole";

@injectable()
export class JwtAuthScopeService extends BaseAuthScopeService {

    constructor(source: Hapi.Server | Hapi.Request, throwable: boolean = false) {
        super();

        this.adminScope = JwtAuthRole.Admin;

        if (ObjectCheckOf<Hapi.Request>(source, "server")) {
            this.initialize(source);
        } else if (throwable) {
            throw Boom.unauthorized();
        }
    }
}
