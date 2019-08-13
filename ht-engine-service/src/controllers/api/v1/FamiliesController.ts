import * as Hapi from "hapi";
import * as HttpStatus from "http-status-codes";
import { inject, injectable } from "inversify";
import * as _ from "lodash";

import { Family } from "../../../models/entities/Family";
import { Organization } from "../../../models/entities/Organization";
import { User } from "../../../models/entities/User";
import { RouteOwner } from "../../../plugins/router";
import { JwtAuthSessionService } from "../../../services/auth/jwt/JwtAuthSessionService";
import { AccountOperationService } from "../../../services/blockchain/operations/AccountOperationService";
import { OperationType } from "../../../services/bussiness/common/OperationType";
import { FamilyService } from "../../../services/bussiness/FamilyService";
import { OperationLogService } from "../../../services/bussiness/OperationLogService";
import { Payload } from "../../../utils/payload";
import { ResponseBuilder } from "../../../utils/render/ResponseBuilder";
import { BaseController } from "../../base/BaseController";

@injectable()
export class FamiliesController extends BaseController<Family> {

    @inject(JwtAuthSessionService)
    private session: JwtAuthSessionService;

    @inject(AccountOperationService)
    private $accountOperationService: AccountOperationService;

    @inject(FamilyService)
    private familyService: FamilyService;

    @inject(OperationLogService)
    private operationLogService: OperationLogService;

    public async edit(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        const agent = this.getAgent(request, RouteOwner.App);
        try {
            const payload = request.payload as Payload;
            const user = await this.session.account(request, User);
            const family = await this.$editFactory<Family>(request, agent);

            if (!_.isNil(payload.pin)) {
                await this.operationLogService.log({
                    objectId: family.id.toString(),
                    objectName: family.constructor.name,
                    operation: OperationType.ResetFamilyPin,
                }, user);
            }

            return new ResponseBuilder(response).code(HttpStatus.NO_CONTENT).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async create(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const user = await this.session.account(request, User);
            const charity = await this.$showFactory<Organization>(request);
            const family = await this.$createFactory<Family>(request);
            try {
                const chainAccount = await this.$accountOperationService.publish(request, charity.chainEntity, family.chainEntity);

                await this.familyService.updateFamilyWithChainData(family.chainEntity, chainAccount);
                await this.$accountOperationService.transferAssets(request, charity.chainEntity, family.chainEntity);
                await this.operationLogService.log({
                    objectId: family.id.toString(),
                    objectName: family.constructor.name,
                    operation: OperationType.CreateFamily,
                }, user);
            } catch (error) {
                await this.$deleteFactory(request, family);
                throw error;
            }
            return new ResponseBuilder(response).code(HttpStatus.CREATED).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async payInStore(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const user = await this.session.account(request, User);
            const result = await this.familyService.payInStore(request, user);
            return new ResponseBuilder(response).render(result).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }
}
