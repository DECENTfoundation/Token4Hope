import { Action } from "../../utils/redux";
import { Family } from "./Family";
import { FamilyEvent } from "./FamilyEvent";

export class FamilyAction {

    public static resetFamily = (): Action => {
        return { type: FamilyEvent.Reset };
    }

    public static create(payload: Family): Action<Family> {
        return { type: FamilyEvent.Create, payload };
    }

    public static edit(payload: Family): Action<Family> {
        return { type: FamilyEvent.Edit, payload };
    }
}
