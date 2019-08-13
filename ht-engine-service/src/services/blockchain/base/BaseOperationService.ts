// tslint:disable-next-line:max-line-length
import { AccountCreateOperation, AssetAmount, BaseOperation, ChainObject, DCoreApi, ECKeyPair, TransactionConfirmation } from "dcorejs-sdk";
import { TransferOperation } from "dcorejs-sdk";
import { injectable } from "inversify";
import { Observable } from "rxjs";
import { BlockChainAccount } from "../../../plugins/blockchain/BlockchainStrategy";
import { BaseBlockchainService } from "./BaseBlockchainService";

@injectable()
export abstract class BaseOperationService extends BaseBlockchainService {

    public prepareAccountCreate(creatorAccount: BlockChainAccount, targetAccount: BlockChainAccount): AccountCreateOperation {
        return new AccountCreateOperation(
            ChainObject.parse(creatorAccount.chainId), targetAccount.chainName, targetAccount.key.toKeypair().publicAddress,
        );
    }

    protected send(provider: DCoreApi, keypair: ECKeyPair, operations: BaseOperation[]): Observable<TransactionConfirmation> {
        return provider.broadcastApi.broadcastWithCallback(keypair, operations);
    }

    protected prepareAssetTransferOperation(
        creatorAccount: BlockChainAccount,
        targetAccount: BlockChainAccount,
        amount: AssetAmount,
    ): TransferOperation {
        return new TransferOperation(
            ChainObject.parse(creatorAccount.chainId), ChainObject.parse(targetAccount.chainId), amount,
        );
    }
}
