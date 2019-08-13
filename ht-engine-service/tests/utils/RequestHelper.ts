import { HttpMethod } from "../../src/utils/http/HttpMethod";

export class RequestHelper {

    public static getByMethod(method: HttpMethod, url: string, headers?: string[], payload?: object, token?: string) {
        const request: any = {
            headers: {},
            payload: {},
        };
        const contentType = "application/vnd.decent.ht.v1+json";
        const contentHtml = "text/html";

        request.url = url;
        request.method = method;
        if (payload) {
            request.payload = payload;
        }
        if (headers) {
            if (headers.includes("accept")) {
                request.headers.Accept = contentType;
            }
            if (headers.includes("accept-html")) {
                request.headers.Accept = contentHtml;
            }
            if (headers.includes("content")) {
                request.headers["Content-Type"] = contentType;
            }
            headers.map((el) => {
                if (el.includes("multipart/form-data")) {
                    request.headers["Content-Type"] = el;
                }
            });
            if (headers.includes("auth")) {
                request.headers.Authorization = "Bearer " + token;
            }
        }

        return request;
    }

}
