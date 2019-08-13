import { Metadata } from "../../../utils/payload";

export interface SecurityMetadata extends Metadata {
    readonly scopes: string[];
}
