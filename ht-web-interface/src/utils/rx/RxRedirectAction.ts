/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-08 05:33:56
 */

import * as _ from "lodash";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { PartialError } from "../error";
import { Action, ActionRedirectResult } from "../redux";

// tslint:disable-next-line:max-line-length
export const RxRedirectAction = <T, E extends PartialError = PartialError>(observable: Observable<T>, result: ActionRedirectResult): Observable<Action<T, E>> => {
    return observable.pipe(
        map((payload) => {
            return ({ payload, type: result.success } as Action<T, E>);
        }),
        catchError((error) => {

            const redirect = !_.isNil(result.redirect) && !_.isNil(result.code) && _.toString(result.code) === _.toString(error.code);
            return of({ payload: error, type: redirect ? result.redirect : result.failure });
        }),
    );
};
