import { Expose, Type } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";
import { ChainAccountDto } from "./ChainAccountDto";

@Sealed
export class ChainAccountListDto extends BaseEntityDto {

    @Expose()
    public charityTokens: string = "0";

    @Expose()
    public familyTokens: string = "0";

    @Expose()
    public storeTokens: string = "0";

    @Expose()
    @Type(() => ChainAccountDto)
    public accounts: ChainAccountDto[];

    public constructor({
        charityTokens,
        familyTokens,
        storeTokens,
        accounts,
    }: {
            charityTokens: string,
            familyTokens: string,
            storeTokens: string,
            accounts: ChainAccountDto[],
        }) {
        super();
        this.charityTokens = charityTokens;
        this.familyTokens = familyTokens;
        this.storeTokens = storeTokens;
        this.accounts = accounts;
    }
}
