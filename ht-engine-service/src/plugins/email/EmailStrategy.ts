import * as Hapi from "hapi";
import { ConfirmationMetadata } from "../../services/email/metadata/ConfirmationMetadata";
import { ConfirmationType } from "../../services/email/metadata/ConfirmationType";
import { PasswordMetadata } from "../../services/email/metadata/PasswordMetadata";
import { PasswordResetType } from "../../services/email/metadata/PasswordResetType";

export interface EmailStrategy {
    confirmation(request: Hapi.Request, data: ConfirmationMetadata, type: ConfirmationType): Promise<void>;
    passwordReset(request: Hapi.Request, data: PasswordMetadata, type: PasswordResetType): Promise<void>;
}
