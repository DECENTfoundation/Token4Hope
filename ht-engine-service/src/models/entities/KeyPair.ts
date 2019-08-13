import { ECKeyPair } from "dcorejs-sdk";
import * as _ from "lodash";
import { Column, DefaultScope, Table } from "sequelize-typescript";

import { BlockchainCredentials } from "../../plugins/blockchain";
import { KeyCredentails, KeystoreStrategy } from "../../plugins/keystore";
import { CryptoUtils } from "../../utils/foundation";
import { BaseEntityModel } from "../base/entities/BaseEntityModel";
import { TransferObjectType } from "../base/transfer-objects/decorators/TransferObjectDecorators";
import { KeyPairDto } from "../transfer-objects/KeyPairDto";

@DefaultScope({})
@Table({ modelName: "key_pair" })
@TransferObjectType(() => KeyPairDto)
export class KeyPair extends BaseEntityModel<KeyPair> implements KeystoreStrategy, KeyCredentails, BlockchainCredentials {

    @Column
    public publicKey: string;

    @Column
    public privateKey: string;

    @Column
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
