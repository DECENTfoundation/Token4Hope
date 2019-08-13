import { CustomInitialDataSeed } from "../../../../plugins/initial-seed/CustomInitialDataSeed";

export interface OperationDataSeed extends CustomInitialDataSeed {
    from: string;
    to: string;
    amount: string;
    timestamp: string;
}
