import { Model } from "sequelize-typescript";

export type AuthPasswordTypeOfModel<T extends Model<T>> = Model<T> & {
    comparePassword(password: string): Promise<boolean>;
};
