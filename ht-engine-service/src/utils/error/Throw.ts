import * as Boom from "boom";

import { EntityKeyError } from "../../models/constants/EntityKeyError";
import { PaymentError } from "../../models/constants/PaymentError";
import { ErrorEvent } from "../../models/events/ErrorEvent";

export class Throw {

    public static notFound(entity: string = "unknown") {
        throw Boom.notFound<ErrorEvent<EntityKeyError>>(
            null, { key: EntityKeyError.NotFound, entity },
        );
    }

    public static failedDependency(message?: string, data?: any) {
        throw Boom.failedDependency(message, data);
    }

    public static notEnoughFunds(entity: string = "unknown") {
        throw Boom.conflict<ErrorEvent<PaymentError>>(
            null, { key: PaymentError.NotEnoughFunds, entity },
        );
    }
}
