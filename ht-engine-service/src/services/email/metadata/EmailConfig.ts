import { SendEmailRequest } from "aws-sdk/clients/ses";

export interface EmailConfig {
    withdrawal: {
        request: SendEmailRequest,
    };
}
