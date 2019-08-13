import { Metadata } from "../../../utils/payload";

export interface SessionCredentials extends Metadata {
    id?: string | number;
    sub?: string;
    pool?: string;
    scope?: string | string[];
}
