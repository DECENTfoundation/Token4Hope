import * as Hapi from "hapi";
import { inject, injectable } from "inversify";

import { Family } from "../../../models/entities/Family";
import { ChainAccountService } from "../../../services/bussiness/ChainAccountService";
import { ResponseBuilder } from "../../../utils/render/ResponseBuilder";
import { BaseController } from "../../base/BaseController";

@injectable()
export class ChainAccountController extends BaseController<Family> {

    @inject(ChainAccountService)
    private chainAccountService: ChainAccountService;

    public async index(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const result = await this.chainAccountService.getAllChainAccountsWithBallance(request);
            return new ResponseBuilder(response).render(result).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }
}
