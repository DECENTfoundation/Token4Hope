import { Payload } from "./Payload";

export interface Multipart<T = any> extends Payload {
    resource: T;
    data: FormData;
}
