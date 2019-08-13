/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-02-16 21:02:15
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-10 07:21:43
 */

import * as HttpStatus from "http-status-codes";
import * as _ from "lodash";

import { AxiosError } from "axios";

export class HttpErrorFactory {
    public static sanitizeError(error: AxiosError): AxiosError {
        if (_.isNil(error.code)) {
            error.code = `${_.get(error, "response.status") || HttpStatus.INTERNAL_SERVER_ERROR}`;
        }

        return error;
    }
}
