import * as Hapi from "hapi";
import * as HttpStatus from "http-status-codes";
import { inject, injectable } from "inversify";
import * as _ from "lodash";

import { User } from "../../../models/entities/User";
import { OrmModelProvider } from "../../../plugins/orm";
import { RouteOwner } from "../../../plugins/router";
import { JwtAuthSessionService } from "../../../services/auth/jwt/JwtAuthSessionService";
import { OperationType } from "../../../services/bussiness/common/OperationType";
import { OperationLogService } from "../../../services/bussiness/OperationLogService";
import { RestMethod } from "../../../utils/http";
import { Payload } from "../../../utils/payload";
import { ResponseBuilder } from "../../../utils/render/ResponseBuilder";
import { BaseController } from "../../base/BaseController";

@injectable()
export class UsersController extends BaseController<User> {

    @inject(JwtAuthSessionService)
    private session: JwtAuthSessionService;

    @inject(RestMethod.Signin)
    private $signinFactory: OrmModelProvider;

    @inject(OperationLogService)
    private operationLogService: OperationLogService;

    public async signin(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const agent = this.getAgent(request, RouteOwner.App);
            const user = await this.$signinFactory<User>(request, agent);
            const token = await this.session.signin(request, user);

            return new ResponseBuilder(response).render({ token }, { agent }).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async signout(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            await this.session.signout(request);
            return new ResponseBuilder(response).code(HttpStatus.NO_CONTENT).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async me(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const user = await this.session.account(request, User);
            return new ResponseBuilder(response).render(user).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async edit(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const payload = request.payload as Payload;
            const user = await this.session.account(request, User);

            await this.$editFactory<User>(request, user);

            if (!_.isNil(payload.password)) {
                await this.operationLogService.log({
                    objectId: user.id.toString(),
                    objectName: user.constructor.name,
                    operation: OperationType.ChangeMyPassword,
                }, user);
            }

            return new ResponseBuilder(response).render(user).code(HttpStatus.NO_CONTENT).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }

}
