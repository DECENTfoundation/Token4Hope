import { Options } from "../../utils/foundation";
import { InitialSeedServices } from "./InitialSeedServices";

export interface InitialSeedOptions extends Options {
    initialSeeds: InitialSeedServices[];
}
