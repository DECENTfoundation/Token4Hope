import { SendEmailRequest } from "aws-sdk/clients/ses";
import * as Hapi from "hapi";
import { inject, injectable } from "inversify";
import * as _ from "lodash";

import { ConfigUtils } from "../../utils/configuration";
import { LoggerTag } from "../../utils/logger";
import { AwsEmailFactory } from "../aws/AwsEmailFactory";
import { EmailConfig } from "./metadata/EmailConfig";

@injectable()
export class EmailService {

    @inject("Factory<AWS.SES>")
    private emailFactory: AwsEmailFactory;

    public async withdrawal(source: Hapi.Request, variables: Map<string, string>, emails: string[] = []): Promise<void> {
        const configuration = ConfigUtils.resolve<EmailConfig>("email", { use: true }).withdrawal;

        let text = configuration.request.Message.Body.Html.Data;
        let subject = configuration.request.Message.Subject.Data;
        variables.forEach((v, k) => text = text.replace("${" + k + "}", v));
        variables.forEach((v, k) => subject = subject.replace("${" + k + "}", v));
        emails.forEach(($) => configuration.request.Destination.ToAddresses.push($));
        configuration.request.Message.Body.Html.Data = text;
        configuration.request.Message.Subject.Data = subject;

        if (!_.isEmpty(configuration.request.Destination.ToAddresses)) {
            await this.send(source, configuration.request);
        }
    }

    public async send(source: Hapi.Request, request: SendEmailRequest) {
        source.server.log([LoggerTag.Info, LoggerTag.Email], request);
        await this.emailFactory(source).sendEmail(request).promise();
    }
}
