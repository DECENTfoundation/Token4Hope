import * as _ from "lodash";

import { Expose } from "class-transformer";

import { KeystoreStrategy, KeyTag } from "../../plugins/keystore";
import { CryptoUtils } from "../../utils/foundation";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";

export class KeyDto extends BaseEntityDto implements KeystoreStrategy {

    @Expose()
    public value: string;

    @Expose()
    public tags: string[];

    public unlock(passphrase: string, tags?: KeyTag): this {
        if (!_.isNil(this.value) && !_.isEmpty(_.intersection(this.tags, _.concat([], tags)))) {
            this.value = CryptoUtils.decrypt(this.value, passphrase);
        }
        return this;
    }

    public lock(passphrase: string, tags?: KeyTag): this {
        if (!_.isNil(this.value) && !_.isEmpty(_.intersection(this.tags, _.concat([], tags)))) {
            this.value = CryptoUtils.encrypt(this.value, passphrase);
        }
        return this;
    }
}
