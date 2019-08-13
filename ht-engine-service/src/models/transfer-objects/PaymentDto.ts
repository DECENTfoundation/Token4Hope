import { Expose } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseDto } from "../base/transfer-objects/BaseDto";

@Sealed
export class PaymentDto extends BaseDto {

    @Expose()
    public senderAddress: string;

    @Expose()
    public receiverAddress: string;

    @Expose()
    public remainingBalance: string;

    constructor(initialState: { senderAddress: string, receiverAddress: string, remainingBalance: string }) {
        super();
        this.senderAddress = initialState.senderAddress;
        this.receiverAddress = initialState.receiverAddress;
        this.remainingBalance = initialState.remainingBalance;
    }

}
