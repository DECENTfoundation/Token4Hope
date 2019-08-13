import { Column } from "sequelize-typescript";

import { BaseEntityModel } from "./BaseEntityModel";

export abstract class BaseTranslationModel<T extends BaseEntityModel<T>> extends BaseEntityModel<T> {

    @Column
    public language: string;
}
