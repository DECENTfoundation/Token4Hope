import { Metadata } from "../../utils/payload";
import { BlockchainSymbol } from "./BlockchainSymbol";

export interface BlockchainAsset extends Metadata {
    id?: string | number;
    symbol?: BlockchainSymbol | string;
    precision?: number;
}
