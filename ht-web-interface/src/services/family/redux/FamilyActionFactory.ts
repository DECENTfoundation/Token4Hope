import * as _ from "lodash";

import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";

import { container } from "../../../assembly/Bootstrap";

import { Family, FamilyEvent } from "../../../models/family";

import { LifecycleEvent } from "../../../utils/lifecycle";
import { Action } from "../../../utils/redux";
import { RxAction } from "../../../utils/rx";

import { RestPath } from "../../base/rest";

import { RxSessionAction } from "../../session/rx/RxSessionAction";

import { FamilyService } from "../FamilyService";

export class FamilyActionFactory {

    private static get service(): FamilyService {
        return container.get(FamilyService);
    }

    public static buildCreate(): (action$: ActionsObservable<Action<Family>>) => Observable<Action<Family>> {
        return (action$: ActionsObservable<Action<Family>>): Observable<Action<Family>> => {
            return action$.ofType(FamilyEvent.Create).pipe(
                mergeMap((obj: Action<Family>) => RxSessionAction(this.service.create(RestPath.Pattern, obj.payload as Family), {
                    failure: FamilyEvent.CreateFailure,
                    success: FamilyEvent.CreateSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, FamilyEvent.Create)),
                )),
            );
        };
    }

    public static buildEdit(): (action$: ActionsObservable<Action<Family>>) => Observable<Action<Family>> {
        return (action$: ActionsObservable<Action<Family>>): Observable<Action<Family>> => {
            return action$.ofType(FamilyEvent.Edit).pipe(
                mergeMap((obj: Action<Family>) => RxAction(this.service.edit(obj.payload, _.omit(obj.payload, "cardNumber") as Family), {
                    failure: FamilyEvent.EditFailure,
                    success: FamilyEvent.EditSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, FamilyEvent.Edit)),
                )),
            );
        };
    }
}
