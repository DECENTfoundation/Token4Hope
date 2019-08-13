import { BaseChainDataSeed } from "./base/BaseChainDataSeed";

export interface FamilyDataSeed extends BaseChainDataSeed {
    cardNumber: string;
    password: string;
}
