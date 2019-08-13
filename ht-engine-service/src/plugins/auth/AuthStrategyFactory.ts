
import { AuthStrategy } from "./AuthStrategy";
import { AuthStrategyType } from "./AuthStrategyType";

export type AuthStrategyFactory = <Data = {}>(type: AuthStrategyType) => AuthStrategy<Data>;
