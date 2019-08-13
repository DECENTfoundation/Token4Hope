import { Column, DefaultScope, Table } from "sequelize-typescript";

import { BaseEntityModel } from "../base/entities/BaseEntityModel";
import { TransferObjectType } from "../base/transfer-objects/decorators";
import { SettingDto } from "../transfer-objects/SettingDto";

@DefaultScope({})
@Table({ modelName: "settings" })
@TransferObjectType(() => SettingDto)
export class Setting extends BaseEntityModel<Setting> {

    @Column
    public type: string;

    @Column({ unique: true })
    public name: string;

    @Column
    public value: string;
}
