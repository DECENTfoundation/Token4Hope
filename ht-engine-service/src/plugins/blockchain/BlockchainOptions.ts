import { Options } from "../../utils/foundation";

export interface BlockchainOptions extends Options {
    readonly symbol: string;
    readonly defaultAssetAmount: string;
    readonly transferRatio: string;
    readonly precision: number;
    readonly network: {
        readonly id: string;
        readonly endpoints: {
            readonly wss: string;
            readonly http: string;
        };
    };
    readonly withdrawalChainId: string;
}
