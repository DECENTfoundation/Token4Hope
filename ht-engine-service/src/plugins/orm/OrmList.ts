
import { Model } from "sequelize-typescript";

export interface OrmList<T extends Model<T>> {
    rows: T[];
    count: number;
}
