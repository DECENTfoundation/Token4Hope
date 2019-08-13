import * as Hapi from "hapi";
import { Payload } from "../../utils/payload";

export interface RouteInject {

    post(payload: Payload): Promise<Hapi.ServerInjectResponse>;
    put(payload: Payload): Promise<Hapi.ServerInjectResponse>;
    patch(payload: Payload): Promise<Hapi.ServerInjectResponse>;
    delete(payload: Payload): Promise<Hapi.ServerInjectResponse>;
}
