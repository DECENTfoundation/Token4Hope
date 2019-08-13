import { EmailMetadata } from "./EmailMetadata";

export interface ConfirmationMetadata extends EmailMetadata {
    confirmationHash: string;
}
