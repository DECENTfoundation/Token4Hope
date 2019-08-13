import * as _ from "lodash";

import { RestResource } from "../../services/base/rest/RestResource";
import { Multipart } from "./Multipart";
import { MultipartMap } from "./MultipartMap";
import { Payload } from "./Payload";

export interface MultipartConstructor {
    build<T extends MultipartMap | Multipart>(): T;
}

export interface MultipartSetConstructor extends MultipartConstructor {
    append<T>(key: string, payload: Payload, resource: RestResource<T>): MultipartSetConstructor;
}

export class MultipartBuilder implements MultipartSetConstructor, MultipartConstructor {

    public static append<T>(key: string, payload: Payload, resource: RestResource<T>): MultipartSetConstructor {
        return new MultipartBuilder().append(key, payload, resource);
    }

    public static insert<T>(payload: Payload, resource: RestResource<T>): MultipartConstructor {
        return new MultipartBuilder().insert(payload, resource);
    }

    private data: Multipart[] = [];

    public append<T>(key: string, payload: Payload, resource: RestResource<T>): MultipartSetConstructor {
        this.data.push({
            data: this.convert(payload), key, resource,
        });

        return this;
    }

    public insert<T>(payload: Payload, resource: RestResource<T>): MultipartConstructor {
        this.data.push({
            data: this.convert(payload), resource,
        });

        return this;
    }

    public build<T extends MultipartMap | Multipart>(): T {
        if (this.data.length === 1) {
            return _.first(this.data) as T;
        }
        return _.reduce(this.data, (result: MultipartMap, value: Multipart) => {
            result = {
                ...result, [value.key]: value,
            };
            return result;
        }, {}) as T;
    }

    private convert(payload: Payload): FormData {
        return _.reduce(payload, (result: FormData, value: string | File | any, key: string) => {
            switch (true) {
                case (value instanceof File):
                    result.append(key, value, value.name);
                    break;
                case (_.isArray(value)):
                    value.forEach(($: File) => result.append(key, $, $.name));
                    break;
                default:
                    result.append(key, value);
                    break;
            }
            return result;
        }, new FormData());
    }
}
