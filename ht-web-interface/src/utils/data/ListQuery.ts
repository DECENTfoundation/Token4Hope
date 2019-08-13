import { ListParams } from "./ListParams";

export interface ListQuery<T = any> {
    payload?: T;
    params?: ListParams;
}
