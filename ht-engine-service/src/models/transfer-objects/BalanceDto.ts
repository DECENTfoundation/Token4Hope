import { Expose } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseDto } from "../base/transfer-objects/BaseDto";

@Sealed
export class BalanceDto extends BaseDto {

    @Expose()
    public amount: string;

    @Expose()
    public chainName: string;

    constructor(initialState: { amount: string, chainName: string }) {
        super();
        this.amount = initialState.amount;
        this.chainName = initialState.chainName;
    }

}
