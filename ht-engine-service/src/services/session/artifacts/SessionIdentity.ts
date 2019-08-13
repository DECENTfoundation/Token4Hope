import { Metadata } from "../../../utils/payload";
import { SessionCredentials } from "./SessionCredentials";

export interface SessionIdentity<T extends SessionCredentials = SessionCredentials, U extends Metadata = Metadata> extends Metadata {
    credentials: T;
    artifacts: U;
}
