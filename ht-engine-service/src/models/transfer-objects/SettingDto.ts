import { Expose } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";

@Sealed
export class SettingDto extends BaseEntityDto {

    @Expose()
    public name: string;

    @Expose()
    public value: string;

    @Expose()
    public type: string;
}
