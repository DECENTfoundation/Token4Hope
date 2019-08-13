import * as _ from "lodash";

import { Exclude, Expose, plainToClass, Type } from "class-transformer";
import { ChainObject, ECKeyPair } from "dcorejs-sdk";

import { BlockchainPassport } from "../../plugins/blockchain";
import { KeystoreStrategy } from "../../plugins/keystore";
import { AttributeAccess } from "../access-control";
import { BaseDto } from "../base/transfer-objects/BaseDto";

import { BlockchainAmountDto } from "./BlockchainAmountDto";
import { KeyCredentialsDto } from "./KeyCredentialsDto";

export class BlockchainPassportDto extends BaseDto implements KeystoreStrategy, BlockchainPassport {

    public static parse(plain?: BlockchainPassport): BlockchainPassportDto {
        return plainToClass<BlockchainPassportDto, BlockchainPassport>(
            BlockchainPassportDto, plain, { ignoreDecorators: true },
        );
    }

    @Expose()
    public id?: string;

    @Expose({
        groups: [
            AttributeAccess.Customer,
            AttributeAccess.Kafka,
            AttributeAccess.Session,
        ],
    })
    public name?: string;

    @Expose({
        groups: [
            AttributeAccess.Content,
        ],
    })
    @Type(() => BlockchainAmountDto)
    public price?: BlockchainAmountDto;

    @Expose({
        groups: [
            AttributeAccess.Customer,
            AttributeAccess.Kafka,
            AttributeAccess.Session,
        ],
    })
    @Type(() => KeyCredentialsDto)
    public credentials?: KeyCredentialsDto;

    @Exclude({ toPlainOnly: true })
    @Type(() => Date)
    public expiration?: Date;

    public unlock(passphrase: string): this {
        if (!_.isNil(this.credentials)) {
            this.credentials = this.credentials.unlock(passphrase);
        }
        return this;
    }

    public lock(passphrase: string): this {
        if (!_.isNil(this.credentials)) {
            this.credentials = this.credentials.lock(passphrase);
        }
        return this;
    }

    public exchange(unlock: string, lock: string): this {
        if (!_.isNil(this.credentials)) {
            this.credentials = this.credentials.exchange(unlock, lock);
        }
        return this;
    }

    public toChainObject(): ChainObject {
        return ChainObject.parse(this.id);
    }

    public toKeypair(): ECKeyPair {
        return this.credentials.toKeypair();
    }
}
