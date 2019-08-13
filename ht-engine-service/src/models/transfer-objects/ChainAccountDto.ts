import { Expose } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";

@Sealed
export class ChainAccountDto extends BaseEntityDto {

    @Expose()
    public account: string;

    @Expose()
    public chainName: string;

    @Expose()
    public balance: string;

    public constructor({ account, chainName, balance }: { account: string, chainName: string, balance: string }) {
        super();
        this.account = account;
        this.chainName = chainName;
        this.balance = balance;
    }
}
