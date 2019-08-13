import { CustomInitialDataSeed } from "./CustomInitialDataSeed";

export interface InitialSeedExecuter {
    execute(seedData: CustomInitialDataSeed[]): Promise<void>;
}
