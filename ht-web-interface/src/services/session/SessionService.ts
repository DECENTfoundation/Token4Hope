/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 11:27:47
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-12 16:15:37
 */

import * as HttpStatus from "http-status-codes";
import * as _ from "lodash";

import { injectable } from "inversify";
import { Observable, Observer } from "rxjs";

import { Session } from "../../models/session";

import { HttpHeader } from "../base/http/HttpHeader";
import { RestGateway } from "../base/rest";
import { Rest } from "../base/rest/decorators";
import { RestAuth } from "../base/rest/RestAuth";
import { RestMethod } from "../base/rest/RestMethod";
import { RestService } from "../base/rest/RestService";

@Rest({
    gateway: RestGateway.Default,
    routes:  {
        [ RestMethod.Signin ]:  "/user/signin",
        [ RestMethod.Signout ]: { path: "/user/signout", authorized: RestAuth.Bearer },
    },
})
@injectable()
export class SessionService extends RestService<Session> {

    public get current(): Observable<Session> {
        return Observable.create((observer: Observer<Session>) => {
            const credentials = this.getCredentials(RestAuth.Bearer);
            if (!_.isNil(credentials)) {
                observer.next({ token: credentials[HttpHeader.Authorization] });
                observer.complete();
            } else {

                const message = HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED);
                observer.error(
                    _.set({}, "response.data.error", {
                        message,
                        name: message,
                        status: HttpStatus.UNAUTHORIZED,
                    }),
                );
            }
        });
    }
}
