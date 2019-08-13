import * as Hapi from "hapi";
import * as HttpStatus from "http-status-codes";
import { inject, injectable } from "inversify";
import { Family } from "../../../models/entities/Family";
import { BalanceService } from "../../../services/bussiness/BalanceService";
import { ResponseBuilder } from "../../../utils/render/ResponseBuilder";
import { BaseController } from "../../base/BaseController";

@injectable()
export class BalanceController extends BaseController<Family> {

    @inject(BalanceService)
    private service: BalanceService;

    public async balanceByCard(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const result = await this.service.getBalanceByCard(request);
            return new ResponseBuilder(response).render(result).code(HttpStatus.OK).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async balanceByChainName(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const result = await this.service.getBalanceByChainName(request);
            return new ResponseBuilder(response).render(result).code(HttpStatus.OK).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }
}
