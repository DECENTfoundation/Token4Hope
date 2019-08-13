import * as Hapi from "hapi";
import { inject, injectable } from "inversify";
import { Organization } from "../../../models/entities/Organization";
import { TransactionService } from "../../../services/bussiness/TransactionService";
import { ResponseBuilder } from "../../../utils/render/ResponseBuilder";
import { BaseController } from "../../base/BaseController";

@injectable()
export class TransactionController extends BaseController<Organization> {

    @inject(TransactionService)
    private transactionService: TransactionService;

    public async index(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        try {
            const result = await this.transactionService.getTransactionList(request);
            return new ResponseBuilder(response).render(result).build();
        } catch (error) {
            return this.renderError(request, error);
        }
    }
}
