
import * as Hapi from "hapi";

import { ObjectExpose } from "../../utils/foundation/class";

export interface AuthStrategy<Input = {}, Output = {}> {
    strategy: ObjectExpose<this>;
    authenticate(request: Hapi.Request, data: Input, helper: Hapi.ResponseToolkit): Promise<Output>;
}
