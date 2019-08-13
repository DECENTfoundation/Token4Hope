import { Metadata } from "../../utils/payload";

export interface ErrorEvent<Key = ""> extends Metadata {
    readonly key: Key;
}
