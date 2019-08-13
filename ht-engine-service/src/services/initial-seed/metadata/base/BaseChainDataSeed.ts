import { CustomInitialDataSeed } from "../../../../plugins/initial-seed/CustomInitialDataSeed";

export interface BaseChainDataSeed extends CustomInitialDataSeed {
    privateKey: string;
    brainKey: string;
    publicKey: string;
    chainId: string;
    chainName: string;
}
