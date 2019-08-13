import { KeyTag } from "./KeyTag";

export interface KeystoreStrategy {
    unlock?(passphrase: string, tags?: KeyTag): this;
    lock?(passphrase: string, tags?: KeyTag): this;
    exchange?(unlock: string, lock: string, tags?: KeyTag): this;
}
