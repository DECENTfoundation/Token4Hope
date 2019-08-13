import { InitialSeedExecuter } from "./InitialSeedExecuter";
import { InitialSeedType } from "./InitialSeedType";

export type InitialSeedFactory = (type: InitialSeedType | string) => InitialSeedExecuter;
