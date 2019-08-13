/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-08 05:33:56
 */

import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { PartialError } from "../error";
import { Action, ActionResult } from "../redux";

// tslint:disable-next-line:max-line-length
export const RxAction = <T, E extends PartialError = PartialError>(observable: Observable<T>, result: ActionResult): Observable<Action<T, E>> => {
    return observable.pipe(
        map((payload) => {
            return ({ payload, type: result.success } as Action<T, E>);
        }),
        catchError((error) => {
            return of({ payload: error, type: result.failure });
        }),
    );
};
