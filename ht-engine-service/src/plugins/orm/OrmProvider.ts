import { Sequelize } from "sequelize-typescript";

import { OrmOptions } from "./OrmOptions";

export type OrmProvider = (options: OrmOptions) => Promise<Sequelize>;
