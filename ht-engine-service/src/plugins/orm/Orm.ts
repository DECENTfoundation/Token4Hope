import { Sequelize } from "sequelize-typescript";

export interface Orm {
    getConnection(): Sequelize;
}
