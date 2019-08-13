import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap, switchMap, takeUntil } from "rxjs/operators";

import { container } from "../../../assembly/Bootstrap";

import { Session, SessionEvent } from "../../../models/session";
import { Action } from "../../../utils/redux";
import { RxAction } from "../../../utils/rx";
import { RestPath } from "../../base/rest";

import { SessionService } from "../SessionService";

export class SessionActionFactory {

    private static get service(): SessionService {
        return container.get(SessionService);
    }

    public static buildCurrent(): (action$: ActionsObservable<Action>) => Observable<Action<Session>> {
        return (action$: ActionsObservable<Action>): Observable<Action<Session>> => {
            return action$.ofType(SessionEvent.Current).pipe(
                mergeMap((obj: Action) => RxAction(this.service.current, {
                    failure: SessionEvent.CurrentFailure,
                    success: SessionEvent.CurrentSuccess,
                }).pipe(
                    takeUntil(action$.ofType(SessionEvent.Current)),
                )),
            );
        };
    }

    public static buildSignin(): (action$: ActionsObservable<Action<Session>>) => Observable<Action<Session>> {
        return (action$: ActionsObservable<Action<Session>>): Observable<Action<Session>> => {
            return action$.ofType(SessionEvent.Signin).pipe(
                mergeMap((obj: Action<Session>) => RxAction(this.service.signin(RestPath.Pattern, obj.payload), {
                    failure: SessionEvent.SigninFailure,
                    success: SessionEvent.SigninSuccess,
                }).pipe(
                    takeUntil(action$.ofType(SessionEvent.Signin)),
                )),
            );
        };
    }

    public static buildSignout(): (action$: ActionsObservable<Action<Session>>) => Observable<Action<Session>> {
        return (action$: ActionsObservable<Action<Session>>): Observable<Action<Session>> => {
            return action$.ofType(SessionEvent.Signout).pipe(
                // tslint:disable-next-line:max-line-length
                mergeMap((obj: Action<Session>) => RxAction(this.service.current.pipe(switchMap((session: Session) => this.service.signout(RestPath.Pattern, session))), {
                    failure: SessionEvent.SignoutFailure,
                    success: SessionEvent.SignoutSuccess,
                }).pipe(
                    takeUntil(action$.ofType(SessionEvent.Signout)),
                )),
            );
        };
    }
}
