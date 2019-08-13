export type ForTypeOf<T> = { [P in keyof T]: T[P] };
