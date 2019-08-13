import { Multipart } from "./Multipart";

export interface MultipartMap<T = any> {
    [key: string]: Multipart<T>;
}
