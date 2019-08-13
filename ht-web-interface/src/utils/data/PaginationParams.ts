import { Params } from "./Params";

export interface PaginationParams extends Params {
    cursor?: string;
    limit?: number;
}
