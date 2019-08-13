export interface ListRenderer<T> {
    data: {
        offset: number;
        limit: number;
        source: T[];
        skip?: number;
        take?: number;
        count?: number;
    };
}

export type AnyListRenderer = ListRenderer<any>;
