import { PasswordResetParams } from "./PasswordResetParams";

export interface PasswordResetConfig {
    template: string;
    from: string;
    data: PasswordResetParams;
}
