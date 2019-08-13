import { AccountState } from "../../../models/account";
import { SessionState } from "../../../models/session";

export type NavigationProps = NavigationStateProps;

export interface NavigationStateProps {
    session: SessionState;
    account: AccountState;
}
