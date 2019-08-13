import * as _ from "lodash";
import * as Long from "long";

import { classToPlain, Expose, plainToClass, Type } from "class-transformer";
import { Asset, AssetAmount, ChainObject, PricePerRegion, RegionalPrice } from "dcorejs-sdk";
import { Decimal } from "decimal.js";

import { BlockchainAmount } from "../../plugins/blockchain";
import { Sealed } from "../../utils/foundation/class/decorators";

import { BaseDto } from "../base/transfer-objects/BaseDto";
import { BlockchainAssetDto } from "./BlochchainAssetDto";

@Sealed
export class BlockchainAmountDto extends BaseDto implements BlockchainAmount {

    public static parseFromRegional(regional: PricePerRegion): BlockchainAmountDto {
        const [rawValue, assetId] = (_.first(regional.prices.map(($) => [$.price.amount, $.price.assetId.objectId])) || [Long.ZERO, null]);
        return plainToClass<BlockchainAmountDto, BlockchainAmount>(
            BlockchainAmountDto, {
                assetId, rawValue: rawValue.toString(),
            }, { ignoreDecorators: true },
        );
    }

    public static parse(amount: Decimal | string, asset: Asset): BlockchainAmountDto {

        const value = (amount instanceof Decimal) ? amount : new Decimal(amount);
        const assetable = BlockchainAssetDto.parse(asset);
        const rawValue = value.mul(assetable.toMultiplier()).toFixed(BlockchainAmountDto.DecimalPlaces);

        return plainToClass<BlockchainAmountDto, BlockchainAmount>(
            BlockchainAmountDto, {
                asset: classToPlain(assetable, { ignoreDecorators: true }),
                assetId: assetable.id,
                rawValue,
                value: value.toString(),
            }, { ignoreDecorators: true },
        );
    }

    private static DecimalPlaces: number = 0;

    @Expose()
    public value: string;

    @Expose()
    public rawValue: string;

    @Expose()
    public assetId: string;

    @Type(() => BlockchainAssetDto)
    public asset: BlockchainAssetDto;

    public toLong(): Long {
        return Long.fromString(this.rawValue);
    }

    public toRegionalPrice(): RegionalPrice {
        return new RegionalPrice(
            new AssetAmount(this.toLong(), ChainObject.parse(this.asset.id)),
        );
    }
}
