import { Metadata } from "../../../utils/payload";

export interface EmailMetadata extends Metadata {
    email: string;
    variables?: Map<string, string>;
}
