import { EmailMetadata } from "./EmailMetadata";

export interface PasswordMetadata extends EmailMetadata {
    resetHash: string;
}
