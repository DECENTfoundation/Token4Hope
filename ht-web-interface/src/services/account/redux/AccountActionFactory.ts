import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";

import { container } from "../../../assembly/Bootstrap";
import { Account, AccountEvent } from "../../../models/account";
import { LifecycleEvent } from "../../../utils/lifecycle";
import { Action } from "../../../utils/redux";
import { RxAction } from "../../../utils/rx";
import { RestPath } from "../../base/rest";

import { AccountService } from "../AccountService";

export class AccountActionFactory {

    private static get service(): AccountService {
        return container.get(AccountService);
    }

    public static buildShow(): (action$: ActionsObservable<Action>) => Observable<Action<Account>> {
        return (action$: ActionsObservable<Action>): Observable<Action<Account>> => {
            return action$.ofType(AccountEvent.Show).pipe(
                mergeMap((obj: Action) => RxAction(this.service.show(RestPath.Pattern), {
                    failure: AccountEvent.ShowFailure,
                    success: AccountEvent.ShowSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, AccountEvent.Show)),
                )),
            );
        };
    }

    public static buildEdit(): (action$: ActionsObservable<Action<Account>>) => Observable<Action<Account>> {
        return (action$: ActionsObservable<Action<Account>>): Observable<Action<Account>> => {
            return action$.ofType(AccountEvent.Edit).pipe(
                mergeMap((obj: Action<Account>) => RxAction(this.service.edit(obj.payload, obj.payload as Account), {
                    failure: AccountEvent.EditFailure,
                    success: AccountEvent.EditSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, AccountEvent.Edit)),
                )),
            );
        };
    }
}
