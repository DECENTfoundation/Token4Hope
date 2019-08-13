import { Expose, plainToClass } from "class-transformer";
import { Asset } from "dcorejs-sdk";
import { Decimal } from "decimal.js";

import { BlockchainAsset, BlockchainSymbol } from "../../plugins/blockchain";
import { Sealed } from "../../utils/foundation/class/decorators";

import { BaseDto } from "../base/transfer-objects/BaseDto";

@Sealed
export class BlockchainAssetDto extends BaseDto implements BlockchainAsset {

    public static parse(asset: Asset): BlockchainAssetDto {
        return plainToClass<BlockchainAssetDto, BlockchainAsset>(
            BlockchainAssetDto, {
                id: asset.id.objectId,
                precision: asset.precision,
                symbol: asset.symbol,
            }, { ignoreDecorators: true },
        );
    }

    private static Base: number = 10;

    @Expose()
    public id?: string;

    @Expose()
    public symbol?: BlockchainSymbol | string;

    @Expose()
    public precision?: number;

    public toMultiplier(): Decimal {
        return Decimal.pow(BlockchainAssetDto.Base, this.precision);
    }
}
