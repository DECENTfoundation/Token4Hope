import { ConfirmationParams } from "./ConfirmationParams";

export interface ConfirmationConfig {
    template: string;
    from: string;
    data: ConfirmationParams;
}
