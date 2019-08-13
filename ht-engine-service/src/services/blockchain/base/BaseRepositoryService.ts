import {
    Account,
    Asset,
    AssetAmount,
    AssetWithAmount,
    BaseOperation,
    ChainObject,
    NotFoundError,
    ObjectType,
    SearchAccountHistoryOrder,
    TransactionDetail,
} from "dcorejs-sdk";

import { Decimal } from "decimal.js";
import * as Hapi from "hapi";
import { injectable } from "inversify";
import * as _ from "lodash";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { TransactionKeySetting } from "../../../models/constants/TransactionKeySetting";
import { Setting } from "../../../models/entities/Setting";
import { BlockChainAccount, BlockchainSymbol } from "../../../plugins/blockchain";
import { Throw } from "../../../utils/error/Throw";
import { ArrayUtils } from "../../../utils/foundation";
import { LoggerTag } from "../../../utils/logger/LoggerTag";
import { BaseBlockchainService } from "./BaseBlockchainService";

@injectable()
export abstract class BaseRepositoryService extends BaseBlockchainService {

    public getSettings(): Observable<Setting[]> {
        return from(Setting.findAll({ where: { type: TransactionKeySetting.Name } }));
    }

    public getSettingValue(key: TransactionKeySetting): Observable<Decimal> {
        return this.getSettings().pipe(map(($) => ArrayUtils.at($, key)));
    }

    public getAssets(symbols: Array<BlockchainSymbol | string>, request: Hapi.Request): Observable<Asset[]> {
        return this.httpFactory(request).assetApi.lookupAssets(symbols.map(($) => $.toString()));
    }

    public getAsset(symbols: Array<BlockchainSymbol | string>, request: Hapi.Request): Observable<Asset> {
        return this.getAssets(symbols, request).pipe(map(($) => _.first($)));
    }

    public getRequiredFees(operations: BaseOperation[], request: Hapi.Request): Observable<AssetAmount[]> {
        return this.httpFactory(request).assetApi.getFees(operations);
    }

    public getRequiredFee(operations: BaseOperation[], request: Hapi.Request): Observable<AssetAmount> {
        return this.getRequiredFees(operations, request).pipe(map(($) => _.first($)));
    }

    public getBalances(
        owner: BlockChainAccount | string,
        symbols: Array<BlockchainSymbol | string>,
        request: Hapi.Request,
    ): Observable<AssetWithAmount[]> {
        const account = (typeof owner === "string") ? owner : owner.chainName;
        return this.httpFactory(request).balanceApi.getBalance(account, symbols);
    }

    public getBalance(
        owner: BlockChainAccount | string,
        symbols: Array<BlockchainSymbol | string>,
        request: Hapi.Request,
    ): Observable<AssetWithAmount> {
        return this.getBalances(owner, symbols, request).pipe(map(($) => _.first($)));
    }

    public getAccount(
        owner: BlockChainAccount | string,
        request: Hapi.Request,
    ): Observable<Account> {
        const chainName = (typeof owner === "string") ? owner : owner.chainName;
        return this.httpFactory(request).accountApi.getAccountByName(chainName);
    }

    public getAccountHistory(
        account: BlockChainAccount,
        request: Hapi.Request,
        fromBlock: ChainObject = ObjectType.Null.genericId(),
    ): Observable<TransactionDetail[]> {
        return this.httpFactory(request).accountApi.searchAccountHistory(
            ChainObject.parse(account.chainId),
            SearchAccountHistoryOrder.TimeDesc,
            fromBlock,
            100,
        );
    }

    public async exists(chainName: BlockChainAccount, request: Hapi.Request) {
        try {
            const account = await this.getAccount(chainName, request).toPromise();
            if (_.isNil(account)) {
                Throw.notFound(Account.name);
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                Throw.notFound(Account.name);
            }
            request.server.log([LoggerTag.Error, LoggerTag.Blockchain], error);
            Throw.failedDependency();
        }
    }
}
