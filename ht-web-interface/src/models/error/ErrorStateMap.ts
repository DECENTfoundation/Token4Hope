import { ErrorState } from "./ErrorState";

export interface ErrorStateMap {
    [key: string]: () => ErrorState;
}
