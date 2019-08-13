/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 20:36:32
 */

import Http, { AxiosInstance } from "axios";

import { inject, injectable } from "inversify";
import { Observable, Observer } from "rxjs";

import { HttpErrorFactory } from "./HttpErrorFactory";
import { HttpRequest } from "./HttpRequest";
import { HttpResult } from "./HttpResult";

@injectable()
export abstract class HttpService {

    @inject("Storage")
    protected storage: Storage;

    @inject("AxiosInstance")
    protected engine: AxiosInstance;

    protected $get<T>(path: string, request?: HttpRequest): Observable<T> {
        return Observable.create(async (observer: Observer<HttpResult<T>>) => {
            const dispose = Http.CancelToken.source();
            try {
                const res = await this.engine.get<T>(path, { ...request, cancelToken: dispose.token });
                observer.next({ status: res.status, ...(res.data as any) });
                observer.complete();
            } catch (error) {
                observer.error(HttpErrorFactory.sanitizeError(error));
            }
            return () => dispose.cancel();
        });
    }

    protected $put<T>(path: string, payload: T, request?: HttpRequest): Observable<HttpResult<T>> {
        return Observable.create(async (observer: Observer<HttpResult<T>>) => {
            const dispose = Http.CancelToken.source();
            try {
                const res = await this.engine.put<T>(path, payload, { ...request, cancelToken: dispose.token });
                observer.next({ status: res.status, data: payload, ...(res.data as any) });
                observer.complete();
            } catch (error) {
                observer.error(HttpErrorFactory.sanitizeError(error));
            }
            return () => dispose.cancel();
        });
    }

    protected $patch<T>(path: string, payload: T, request?: HttpRequest): Observable<HttpResult<T>> {
        return Observable.create(async (observer: Observer<HttpResult<T>>) => {
            const dispose = Http.CancelToken.source();
            try {
                const res = await this.engine.patch<T>(path, payload, { ...request, cancelToken: dispose.token });
                observer.next({ status: res.status, data: payload, ...(res.data as any) });
                observer.complete();
            } catch (error) {
                observer.error(HttpErrorFactory.sanitizeError(error));
            }
            return () => dispose.cancel();
        });
    }

    protected $post<T>(path: string, payload: T, request?: HttpRequest): Observable<T> {
        return Observable.create(async (observer: Observer<T>) => {
            const dispose = Http.CancelToken.source();
            try {
                const res = await this.engine.post<T>(path, payload, { ...request, cancelToken: dispose.token });
                observer.next({ status: res.status, data: payload, ...(res.data as any) });
                observer.complete();
            } catch (error) {
                observer.error(HttpErrorFactory.sanitizeError(error));
            }
            return () => dispose.cancel();
        });
    }

    protected $delete<T>(path: string, payload: T, request?: HttpRequest): Observable<HttpResult<T>> {
        return Observable.create(async (observer: Observer<HttpResult<T>>) => {
            const dispose = Http.CancelToken.source();
            try {
                const res = await this.engine.delete(path, { ...request, cancelToken: dispose.token });
                observer.next({ status: res.status, data: payload });
                observer.complete();
            } catch (error) {
                observer.error(HttpErrorFactory.sanitizeError(error));
            }
            return () => dispose.cancel();
        });
    }
}
