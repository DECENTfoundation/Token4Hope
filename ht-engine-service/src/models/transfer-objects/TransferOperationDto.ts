import { Exclude, Expose, Transform, Type } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";
import { ChainEntityDto } from "./ChainEntityDto";

@Sealed
export class TransferOperationDto extends BaseEntityDto {
    @Expose()
    public fromAddress: string;

    @Expose()
    public toAddress: string;

    @Expose()
    public amount: string;

    @Exclude()
    public block: string;

    @Transform((value: string) => new Date(value), { toClassOnly: true })
    @Transform((value: Date) => value.toISOString(), { toPlainOnly: true })
    @Expose()
    public blockTimestamp: Date;

    @Exclude()
    @Type(() => ChainEntityDto)
    public fromEntity: ChainEntityDto;

    @Exclude()
    @Type(() => ChainEntityDto)
    public toEntity: ChainEntityDto;
}
