import { Expose, Type } from "class-transformer";

import { KeystoreStrategy, KeyTag } from "../../plugins/keystore";
import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";
import { KeyDto } from "./KeyDto";
import { UserDto } from "./UserDto";

@Sealed
export class KeystoreDto extends BaseEntityDto implements KeystoreStrategy {

    @Expose()
    public value: string;

    @Expose()
    @Type(() => KeyDto)
    public keys: KeyDto[];

    public ownerable: string;

    public ownerableId: number;

    @Type(() => UserDto)
    public user: UserDto;

    public unlock(passphrase: string, tags?: KeyTag): this {
        this.keys = (this.keys || []).map(($) => $.unlock(passphrase, tags));
        return this;
    }

    public lock(passphrase: string, tags?: KeyTag): this {
        this.keys = (this.keys || []).map(($) => $.lock(passphrase, tags));
        return this;
    }
}
