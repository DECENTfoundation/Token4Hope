import { Metadata } from "../../utils/payload";

export interface KeyCredentails extends Metadata {
    publicKey?: string;
    privateKey?: string;
    brainKey?: string;
}
