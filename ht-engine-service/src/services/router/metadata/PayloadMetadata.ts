import * as Hapi from "hapi";

import { Metadata } from "../../../utils/payload";

export interface PayloadMetadata extends Metadata {
    readonly maxbytes: number;
    readonly parse: boolean;
    readonly output: Hapi.PayloadOutput;
}
