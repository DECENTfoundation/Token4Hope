import { Action } from "../../utils/redux";

export class BaseAction<T> {

    constructor(private event: string) {

    }

    public list(param?: T): Action<T> {
        return {
            payload: param,
            type: this.event,
        };
    }

}
