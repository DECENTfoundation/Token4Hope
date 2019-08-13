import { injectable } from "inversify";

import { OperationLog } from "../../models/entities/OperationLog";
import { User } from "../../models/entities/User";
import { Operation } from "./common/Operation";

@injectable()
export class OperationLogService {

    public async log(operation: Operation, initiator: User) {
        const createdTransaction = await OperationLog.create({ ...operation });
        await createdTransaction.$set("user", initiator);
    }
}
