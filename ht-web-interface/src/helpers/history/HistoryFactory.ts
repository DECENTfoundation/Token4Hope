import * as _ from "lodash";
import * as Qs from "qs";

import { ListParams } from "../../utils/data";

import { RouteComponentProps } from "react-router";
import { Observable, Observer } from "rxjs";
export class HistoryFactory {
    // tslint:disable-next-line:max-line-length
    public static buildParamsObserver<T extends ListParams, U>(props: RouteComponentProps<T>, transform: (args: T, next?: any) => U, initial: boolean = true): Observable<U> {

        return Observable.create((observer: Observer<U>) => {
            const { params } = props.match;
            const dispose = props.history.listen((location) => {
                const param = _.first(_.filter(_.split(location.pathname, "/"), Boolean));
                if (!_.isNil(param)) {
                    observer.next(transform(Object.assign(Qs.parse(_.replace(location.search, "?", "")), params), param));
                }
            });
            if (initial) {
                observer.next(transform(Object.assign(Qs.parse(_.replace(props.history.location.search, "?", "")), params)));
            }
            return dispose;
        });
    }

    // tslint:disable-next-line:max-line-length
    public static attemptAppendQuery<T extends ListParams, U>(props: RouteComponentProps<T>, data: any = {}, key: string = "search"): string | boolean {
        if (!_.isEmpty(data)) {
            const search = _.replace(props.history.location.search, "?", "");
            const path = !_.isEmpty(search) ? Qs.stringify({ ...Qs.parse(search), ...data }) : Qs.stringify(data);
            const success = search !== path;
            if (success) {
                props.history.push({ [key]: path });
                return success;
            } else {
                return path;
            }
        }
        return false;
    }
}
