import { ContainerModule } from "inversify";

import { Options } from "../../utils/foundation";

export interface AssemblyOptions extends Options {
    readonly debug: boolean;
    readonly modules: ContainerModule[];
}
