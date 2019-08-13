import * as Hapi from "hapi";
import { inject, injectable } from "inversify";
import * as _ from "lodash";
import { tap } from "rxjs/operators";
import { Family } from "../../models/entities/Family";
import { BalanceDto } from "../../models/transfer-objects/BalanceDto";
import { Throw } from "../../utils/error/Throw";
import { LoggerTag } from "../../utils/logger";
import { Payload } from "../../utils/payload";
import { PaymentRepositoryService } from "../blockchain/repositories/PaymentRepositoryService";

@injectable()
export class BalanceService {
    @inject(PaymentRepositoryService)
    private blockchain: PaymentRepositoryService;

    public async getBalanceByChainName(request: Hapi.Request): Promise<BalanceDto> {
        const params = request.params as Payload;
        const chainName = params.chainName;

        await this.blockchain.exists(chainName, request);

        const balance = await this.blockchain.getAccountBalance(chainName, request).pipe(
            tap((error) => request.server.log([LoggerTag.Error, LoggerTag.Blockchain], error)),
        ).toPromise();
        return new BalanceDto({ amount: balance.toString(), chainName });
    }

    public async getBalanceByCard(request: Hapi.Request): Promise<BalanceDto> {
        const params = request.params as Payload;
        const cardNumber = params.cardNumber;
        const family = await Family.findOne({
            where: { ["$chainEntity.name$" as any]: cardNumber } });
        if (_.isNil(family)) {
            Throw.notFound(Family.name);
        }
        const balance = await this.blockchain.getAccountBalance(family.chainEntity, request).pipe(
            tap((error) => request.server.log([LoggerTag.Error, LoggerTag.Blockchain], error)),
        ).toPromise();
        return new BalanceDto({ amount: balance.toString(), chainName: family.chainEntity.chainName });
    }
}
