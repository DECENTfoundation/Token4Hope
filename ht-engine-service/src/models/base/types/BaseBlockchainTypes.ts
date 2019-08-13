import { BlockchainStrategy } from "../../../plugins/blockchain";
import { DataTransferTypeOfModel } from "./BaseDataTransferObjectTypes";

export type BlockchainTypeOfModel = DataTransferTypeOfModel & BlockchainStrategy;
