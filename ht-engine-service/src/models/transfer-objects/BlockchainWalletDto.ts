import { Expose, plainToClass, Transform, Type } from "class-transformer";
import { AssetAmount, BaseOperation, ChainObject, ECKeyPair, TransferOperation } from "dcorejs-sdk";

import { BlockchainPassport } from "../../plugins/blockchain";
import { BaseDto } from "../base/transfer-objects/BaseDto";

export class BlockchainWalletDto extends BaseDto {

    public static parse(plain?: BlockchainPassport): BlockchainWalletDto {
        return plainToClass<BlockchainWalletDto, BlockchainPassport>(
            BlockchainWalletDto, plain, { ignoreDecorators: true },
        );
    }

    @Expose()
    @Transform((value: any) => ChainObject.parse(value), { toClassOnly: true })
    @Type(() => ChainObject)
    public id: ChainObject;

    @Expose()
    @Transform((value: any) => ECKeyPair.parseWif(value), { toClassOnly: true })
    @Type(() => ECKeyPair)
    public secret?: ECKeyPair;

    public toTransferOperation(owner: BlockchainPassport, cost: Long): BaseOperation {
        return new TransferOperation(
            this.id, ChainObject.parse(owner.id), new AssetAmount(cost),
        );
    }
}
