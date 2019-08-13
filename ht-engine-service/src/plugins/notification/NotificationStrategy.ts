import * as Hapi from "hapi";

export interface NotificationStrategy<T, Output = void> {
    validate(request: Hapi.Request): Promise<boolean>;
    confirmation(request: Hapi.Request, model: T): Promise<Output>;
    resetPassword(request: Hapi.Request, model: T): Promise<Output>;
}
