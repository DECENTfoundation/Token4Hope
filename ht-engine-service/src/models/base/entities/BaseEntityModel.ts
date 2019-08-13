import { AutoIncrement, Column, PrimaryKey } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";

export abstract class BaseEntityModel<T extends BaseModel<T>> extends BaseModel<T> {

    @PrimaryKey
    @AutoIncrement
    @Column public id: number;
}
