import * as HttpStatus from "http-status-codes";
import * as _ from "lodash";

import { AxiosError } from "axios";
import { PartialError } from "../../utils/error";
import { ObjectCheckOf } from "../../utils/foundation/class";
import { Status } from "./Status";
import { StatusEvent } from "./StatusEvent";

export class StatusFactory {
    public static buildEvent(status: number): StatusEvent {
        switch (true) {
            case (status > 199 && status < 300):
                return StatusEvent.Ok;
            case (status > 299 && status < 400):
                return StatusEvent.Warning;
            case (status > 399):
                return StatusEvent.Error;
            default:
                return StatusEvent.Error;
        }
    }

    public static buildStatus(error: PartialError): Status {
        if (_.isNil(error)) {
            return null;
        }
        if (ObjectCheckOf<AxiosError>(error, "response")) {
            return {
                message: error.response.statusText,
                status: _.toNumber(error.code),
            };
        }
        return {
            message: error.message,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        };
    }

}
