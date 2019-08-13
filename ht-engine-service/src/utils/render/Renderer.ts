export interface Renderer<T> {
    data: T;
}

export type AnyRenderer = Renderer<any>;
