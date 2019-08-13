
import { Params } from "./Params";

export interface ParamsTransformer {
    params?: Params;
    paramsSerializer?: (params: Params) => string;
}
