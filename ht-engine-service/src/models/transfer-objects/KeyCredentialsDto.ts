import * as _ from "lodash";

import { Expose, plainToClass } from "class-transformer";
import { ECKeyPair, Passphrase } from "dcorejs-sdk";

import { BlockchainCredentials } from "../../plugins/blockchain";
import { KeyCredentails, KeystoreStrategy } from "../../plugins/keystore";
import { CryptoUtils } from "../../utils/foundation";
import { Sealed } from "../../utils/foundation/class/decorators";

import { AttributeAccess } from "../access-control";
import { BaseDto } from "../base/transfer-objects/BaseDto";

@Sealed
export class KeyCredentialsDto extends BaseDto implements KeystoreStrategy, KeyCredentails, BlockchainCredentials {

    public static generate(passphrase?: string): KeyCredentialsDto {

        const phrase = passphrase || Passphrase.generate();
        const keypair = ECKeyPair.generateFromPhrase(phrase);

        return plainToClass<KeyCredentialsDto, KeyCredentails>(
            KeyCredentialsDto, {
                brainKey: phrase.toString(),
                privateKey: keypair.privateWif.encoded,
                publicKey: keypair.publicAddress.encoded,
            }, { ignoreDecorators: true },
        );
    }

    @Expose()
    public publicKey: string;

    @Expose({
        groups: [
            AttributeAccess.Customer,
            AttributeAccess.Session,
        ],
    })
    public privateKey: string;

    @Expose({
        groups: [
            AttributeAccess.Customer,
        ],
    })
    public brainKey: string;

    public unlock(passphrase: string): this {
        if (!_.isNil(this.privateKey)) {
            this.privateKey = CryptoUtils.decrypt(this.privateKey, passphrase);
        }
        if (!_.isNil(this.brainKey)) {
            this.brainKey = CryptoUtils.decrypt(this.brainKey, passphrase);
        }
        return this;
    }

    public lock(passphrase: string): this {
        if (!_.isNil(this.privateKey)) {
            this.privateKey = CryptoUtils.encrypt(this.privateKey, passphrase);
        }
        if (!_.isNil(this.brainKey)) {
            this.brainKey = CryptoUtils.encrypt(this.brainKey, passphrase);
        }
        return this;
    }

    public exchange(unlock: string, lock: string): this {
        return this.unlock(unlock).lock(lock);
    }

    public toKeypair(): ECKeyPair {
        return ECKeyPair.parseWif(this.privateKey);
    }
}
