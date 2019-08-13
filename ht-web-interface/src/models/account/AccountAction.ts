import { Action } from "../../utils/redux";
import { Account, EditAccountPayload } from "./Account";
import { AccountEvent } from "./AccountEvent";

export class AccountAction {

    public static showAccount(): Action<Account> {
        return { type: AccountEvent.Show };
    }

    public static editAccount(payload: EditAccountPayload): Action<EditAccountPayload> {
        return { type: AccountEvent.Edit, payload };
    }

    public static editAccountSuccessReset(): Action {
        return { type: AccountEvent.EditAccountSuccessReset };
    }

    public static resetAccountError(): Action {
        return { type: AccountEvent.ResetAccountError };
    }
}
