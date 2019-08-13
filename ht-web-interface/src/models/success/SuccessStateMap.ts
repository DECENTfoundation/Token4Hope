import { SuccessState } from "./SuccessState";

export interface SuccessStateMap {
    [key: string]: () => SuccessState;
}
