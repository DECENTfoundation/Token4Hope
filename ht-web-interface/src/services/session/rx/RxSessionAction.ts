/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-08 05:33:56
 */

import * as HttpStatus from "http-status-codes";
import { SessionEvent } from "../../../models/session";

import { Observable } from "rxjs";

import { PartialError } from "../../../utils/error";
import { Action, ActionRedirectResult } from "../../../utils/redux";

import { RxRedirectAction } from "../../../utils/rx";

// tslint:disable-next-line:max-line-length
export const RxSessionAction = <T, E extends PartialError = PartialError>(observable: Observable<T>, result: ActionRedirectResult): Observable<Action<T, E>> => {
    return RxRedirectAction(observable, { code: HttpStatus.UNAUTHORIZED, redirect: SessionEvent.Signout, ...result });
};
