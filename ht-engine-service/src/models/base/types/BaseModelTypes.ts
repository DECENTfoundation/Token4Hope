
import { Model } from "sequelize-typescript";
import { ForTypeOf } from "../../../utils/foundation/class";

export type NonAbstractTypeOfModel<T> = (new () => T) & ForTypeOf<typeof Model>;
