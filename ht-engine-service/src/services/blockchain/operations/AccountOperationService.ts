import * as Boom from "boom";
import { Account, AssetAmount, TransferOperation } from "dcorejs-sdk";
import * as Hapi from "hapi";
import { inject, injectable } from "inversify";
import * as Long from "long";
import { of } from "rxjs";
import { concatMap, tap } from "rxjs/operators";

import { BlockchainSymbol } from "../../../plugins/blockchain";
import { BlockChainAccount } from "../../../plugins/blockchain/BlockchainStrategy";
import { Throw } from "../../../utils/error/Throw";
import { LoggerTag } from "../../../utils/logger/LoggerTag";
import { BaseOperationService } from "../base/BaseOperationService";
import { AccountRepositoryService } from "../repositories/AccountRepositoryService";

@injectable()
export class AccountOperationService extends BaseOperationService {

    @inject(AccountRepositoryService)
    private accountService: AccountRepositoryService;

    public async publish(
        request: Hapi.Request,
        creatorAccount: BlockChainAccount,
        targetAccount: BlockChainAccount,
    ): Promise<Account> {
        const provider = this.socketFactory(request);

        try {
            await of(targetAccount).pipe(
                concatMap(($) => this.send(provider, creatorAccount.key.toKeypair(), [
                    this.prepareAccountCreate(creatorAccount, $),
                ])),
                tap(
                    () => provider.disconnect(),
                    (error) => request.server.log([LoggerTag.Error, LoggerTag.Blockchain], error),
                ),
            ).toPromise();
            return this.accountService.getAccount(targetAccount, request).toPromise();
        } catch (error) {
            throw Boom.failedDependency();
        }
    }

    public async transferAssets(
        request: Hapi.Request,
        creatorAccount: BlockChainAccount,
        targetAccount: BlockChainAccount,
    ): Promise<any> {

        const provider = this.socketFactory(request);
        const transferOperations = await this.prepareAssetsTransferOperations(request, creatorAccount, targetAccount);

        try {
            const result = await this.send(
                provider,
                creatorAccount.key.toKeypair(),
                transferOperations,
            ).toPromise();
            provider.disconnect();
            return result;
        } catch (error) {
            request.server.log([LoggerTag.Error, LoggerTag.Blockchain], error);
            Throw.failedDependency();
        }
    }

    private async prepareAssetsTransferOperations(
        request: Hapi.Request,
        creatorAccount: BlockChainAccount,
        targetAccount: BlockChainAccount,
    ): Promise<TransferOperation[]> {

        const options = this.getOptionsUsingRequest(request);
        const assets = await this.accountService.getAssets([options.symbol, BlockchainSymbol.DCT], request).toPromise();
        const dctAmount = Long.fromString(options.defaultAssetAmount).multiply(Long.fromString(options.transferRatio));

        return [
            this.prepareAssetTransferOperation(
                creatorAccount,
                targetAccount,
                new AssetAmount(Long.fromString(options.defaultAssetAmount), assets[0].id),
            ),
            this.prepareAssetTransferOperation(
                creatorAccount,
                targetAccount,
                new AssetAmount(dctAmount, assets[1].id),
            ),
        ];
    }
}
