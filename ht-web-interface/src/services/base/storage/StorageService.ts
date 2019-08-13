/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 20:37:34
 */

import * as _ from "lodash";

import { injectable } from "inversify";

@injectable()
export class StorageService implements Storage {
    [key: string]: any;
    [index: number]: string;

    protected localStorage: Storage;

    constructor() {
        try {
            this.localStorage = window.localStorage;
            this.localStorage.setItem("ht.test-ls", "1");
            this.localStorage.removeItem("ht.test-ls");
        } catch (error) {
            this.localStorage = this;
        }
    }

    public get length(): number {
        return _.keys(this).length;
    }

    public get storage(): Storage {
        return this.localStorage;
    }

    public setItem(key: string, value: string) {
        _.set(this, key, value);
    }

    public getItem(key: string): string | null {
        return _.get(this, key, null);
    }

    public key(index: number): string | null {
        return _.keys(this)[index];
    }

    public removeItem(key: string): string | null {
        const item = this.getItem(key);
        delete this[key];
        return item;
    }

    // tslint:disable-next-line:no-empty
    public clear() {
    }
}
