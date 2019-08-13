import * as Boom from "boom";

export interface ErrorRenderer<Data = null> {
    error: Boom.Payload & { status: number, name: string, data: Data };
}
