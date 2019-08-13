import { ChainObject } from "dcorejs-sdk";
import { KeyPair } from "../../models/entities/KeyPair";

export interface BlockChainAccount {
    readonly key: KeyPair;
    readonly chainName: string;
    readonly chainId: string;
    updateRepository?(object: ChainObject): Promise<BlockChainAccount>;
}

export interface BlockchainStrategy {
    chainEntity: BlockChainAccount;
    isRepositorySupported?: boolean;
    isUpdateRepositorySupported?: boolean;
    setTransferPayment?(identities: string[]): this;
}
