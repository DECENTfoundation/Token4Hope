
import * as Catbox from "catbox";
import { SessionOptions } from "./SessionOptions";
import { SessionPoolPolicy } from "./SessionPoolPolicy";

export interface Session {
    flush(): void;
    getOptions(): SessionOptions;
    getPool(policy: string | SessionPoolPolicy): Catbox.Policy;
}
