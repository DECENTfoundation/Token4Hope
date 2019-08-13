import { Asset, TransactionDetail } from "dcorejs-sdk";
import * as Hapi from "hapi";
import { injectable } from "inversify";
import { BlockChainAccount } from "../../../plugins/blockchain";
import { LoggerTag } from "../../../utils/logger";

import { BaseRepositoryService } from "../base/BaseRepositoryService";

@injectable()
export class AccountRepositoryService extends BaseRepositoryService {
    public async getHistory(account: BlockChainAccount, request: Hapi.Request): Promise<TransactionDetail[]> {
        try {
            const options = await this.getOptionsUsingRequest(request);
            const asset = await this.getAsset([options.symbol], request).toPromise();
            const history = await this.getAccountHistory(account, request).toPromise();
            return this.filterAssets(history, asset);
        } catch (error) {
            request.server.log([LoggerTag.Error, LoggerTag.Blockchain], error);
            throw error;
        }
    }

    public async getWithdrawalAccount(request: Hapi.Request): Promise<BlockChainAccount> {
        const options = await this.getOptionsUsingRequest(request);
        return { chainId: options.withdrawalChainId } as BlockChainAccount;
    }

    private filterAssets(list: TransactionDetail[], asset: Asset): TransactionDetail[] {
        return list.filter((tx) => tx.amount.assetId.eq(asset.id));
    }
}
