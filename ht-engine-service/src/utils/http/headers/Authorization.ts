import * as _ from "lodash";

import { AuthorizationOptions } from "./AuthorizationOptions";
import { AuthorizationType } from "./AuthorizationType";

export class Authorization {

  public token: string = "";
  public type: AuthorizationType = AuthorizationType.Unknown;

  constructor(source: string) {
    const [type, token] = this.parse(_.isString(source) ? source : "");

    this.type = type;
    this.token = token;
  }

  public isValid(options?: AuthorizationOptions): boolean {

    const success = !_.isEmpty(this.token) && this.type !== AuthorizationType.Unknown;
    if (!_.isUndefined(options)) {
      return success && this.token.split(options.pattern).length === options.size;
    }

    return success;
  }

  private parse(value?: string): [AuthorizationType, string] {
    if (_.isNil(value) || _.isEmpty(value)) {
      return [AuthorizationType.Unknown, ""];
    }

    const tokens = [AuthorizationType.Bearer].map(
      (id) => _.first(value.match(new RegExp(id.toString() + "\\s+([^;$]+)", "i"))),
    ).filter(Boolean);

    if (_.isEmpty(tokens)) {
      return [AuthorizationType.Unknown, ""];
    }

    const pattern = /\s+/;
    const [type, token] = value.split(pattern);

    return [AuthorizationType[type as any] as AuthorizationType, token];
  }
}
