import { Expose, Type } from "class-transformer";
import { PaginationCursor } from "../../services/bussiness/common/PaginationCursor";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";
import { TransactionDto } from "./TransactionDto";

@Sealed
export class TransactionListDto extends BaseEntityDto {

    @Expose()
    public balance: string;

    @Expose()
    public cursors: PaginationCursor;

    @Expose()
    public tokensReceived: string;

    @Expose()
    public tokensSent: string;

    @Expose()
    @Type(() => TransactionDto)
    public transactions: TransactionDto[];

    public constructor(initial: {
        balance: string,
        tokensReceived: string,
        tokensSent: string,
        transactions: TransactionDto[],
        cursors: PaginationCursor,
    }) {
        super();
        this.balance = initial.balance;
        this.tokensReceived = initial.tokensReceived;
        this.tokensSent = initial.tokensSent;
        this.transactions = initial.transactions;
        this.cursors = initial.cursors;
    }
}
