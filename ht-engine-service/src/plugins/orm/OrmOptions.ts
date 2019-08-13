import { ISequelizeConfig } from "sequelize-typescript";

import { Options } from "../../utils/foundation";

export type OrmOptions = Options & { readonly syncSchema: boolean } & ISequelizeConfig;
