import { AttributeAccess } from "./AttributeAccess";

export type AccessControl = AttributeAccess;

export interface AccessControlMap {
    [key: string]: AccessControl[];
}
