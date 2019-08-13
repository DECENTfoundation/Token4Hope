import { AssetAmount } from "dcorejs-sdk";
import { Decimal } from "decimal.js";
import * as Hapi from "hapi";
import { inject, injectable } from "inversify";
import { tap } from "rxjs/operators";

import { BlockChainAccount } from "../../../plugins/blockchain/BlockchainStrategy";
import { LoggerTag } from "../../../utils/logger";
import { BaseOperationService } from "../base/BaseOperationService";
import { Converter } from "../base/Converter";
import { TransactionResult } from "../common/TransactionResult";
import { PaymentRepositoryService } from "../repositories/PaymentRepositoryService";

@injectable()
export class PaymentOperationService extends BaseOperationService {

    @inject(PaymentRepositoryService)
    private paymentService: PaymentRepositoryService;

    public async getBalance(request: Hapi.Request, account: BlockChainAccount): Promise<Decimal> {
        try {
            return await this.paymentService.getAccountBalance(account, request).toPromise();
        } catch (error) {
            request.server.log([LoggerTag.Error, LoggerTag.Blockchain], error);
        }
        return new Decimal(0);
    }

    public async transfer(
        request: Hapi.Request,
        from: BlockChainAccount,
        to: BlockChainAccount,
        amount: string,
    ): Promise<TransactionResult> {
        const provider = this.socketFactory(request);
        const options = this.getOptionsUsingRequest(request);
        const asset = await this.paymentService.getAsset([options.symbol], request).toPromise();
        const confirmation = await this.send(
            provider,
            from.key.toKeypair(),
            [
                this.prepareAssetTransferOperation(
                    from,
                    to,
                    new AssetAmount(Converter.decimalToSatoshi(amount, options.precision), asset.id),
                ),
            ],
        ).pipe(tap(
            (data) => request.server.log([LoggerTag.Info, LoggerTag.Blockchain], data),
            (error) => request.server.log([LoggerTag.Error, LoggerTag.Blockchain], error),
        )).toPromise();

        provider.disconnect();

        return new TransactionResult(from, to, amount, confirmation);
    }

    public async withdrawal(
        request: Hapi.Request,
        withdrawer: BlockChainAccount,
        amount: string,
    ): Promise<TransactionResult> {
        const options = this.getOptionsUsingRequest(request);
        const to = { chainId: options.withdrawalChainId } as BlockChainAccount;

        return await this.transfer(request, withdrawer, to, amount);
    }
}
