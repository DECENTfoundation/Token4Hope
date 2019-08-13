import { Expose } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";

@Sealed
export class TransactionDto extends BaseEntityDto {
    @Expose()
    public account: string;

    @Expose()
    public accountChainName: string;

    @Expose()
    public amount: string;

    @Expose()
    public direction: string;

    @Expose()
    public timestamp: string;

    @Expose()
    public found: boolean;

    public constructor(initial: {
        account: string,
        accountChainName: string,
        amount: string,
        direction: string,
        timestamp: string,
        found: boolean,
    }) {
        super();
        this.account = initial.account;
        this.accountChainName = initial.accountChainName;
        this.amount = initial.amount;
        this.direction = initial.direction;
        this.timestamp = initial.timestamp;
        this.found = initial.found;
    }
}
