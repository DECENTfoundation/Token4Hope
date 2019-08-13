import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";

import { container } from "../../../assembly/Bootstrap";
import { Balances, BalancesEvent } from "../../../models/balances";
import { LifecycleEvent } from "../../../utils/lifecycle";
import { Action } from "../../../utils/redux";
import { RxAction } from "../../../utils/rx";
import { RestPath } from "../../base/rest";

import { BalancesService } from "../BalancesService";

export class BalancesActionFactory {

    private static get service(): BalancesService {
        return container.get(BalancesService);
    }

    public static buildShow(): (action$: ActionsObservable<Action>) => Observable<Action<Balances>> {
        return (action$: ActionsObservable<Action>): Observable<Action<Balances>> => {
            return action$.ofType(BalancesEvent.Show).pipe(
                mergeMap((obj: Action) => RxAction(this.service.show(RestPath.Pattern), {
                    failure: BalancesEvent.ShowFailure,
                    success: BalancesEvent.ShowSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, BalancesEvent.Show)),
                )),
            );
        };
    }
}
