import { BaseModel } from "../base/BaseModel";

export interface Account extends BaseModel {
    chainId?: string;
    chainName?: string;
    name?: string;
    email?: string;
    roles?: string[];
}

export interface EditAccountPayload extends Account {
    oldPassword: string;
}
