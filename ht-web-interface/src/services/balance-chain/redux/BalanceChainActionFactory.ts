import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";

import { container } from "../../../assembly/Bootstrap";
import { Balance, BalanceEvent } from "../../../models/balance";
import { LifecycleEvent } from "../../../utils/lifecycle";
import { Action } from "../../../utils/redux";
import { RxAction } from "../../../utils/rx";

import { BalanceChainService } from "../BalanceChainService";

export class BalanceChainActionFactory {

    private static get service(): BalanceChainService {
        return container.get(BalanceChainService);
    }

    public static buildShow(): (action$: ActionsObservable<Action>) => Observable<Action<Balance>> {
        return (action$: ActionsObservable<Action>): Observable<Action<Balance>> => {
            return action$.ofType(BalanceEvent.ShowByChain).pipe(
                mergeMap((obj: Action<Balance>) => RxAction(this.service.show(obj.payload), {
                    failure: BalanceEvent.ShowByChainFailure,
                    success: BalanceEvent.ShowByChainSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, BalanceEvent.ShowByChain)),
                )),
            );
        };
    }
}
