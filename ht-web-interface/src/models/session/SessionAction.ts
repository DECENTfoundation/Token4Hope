import { Action } from "../../utils/redux";

import { Session } from "./Session";
import { SessionEvent } from "./SessionEvent";

export class SessionAction {

    public static get current(): Action {
        return { type: SessionEvent.Current };
    }

    public static signin(session: Session): Action<Session> {
        return { type: SessionEvent.Signin, payload: session };
    }

    public static signout(): Action {
        return { type: SessionEvent.Signout };
    }

    public static resetSessionError(): Action {
        return { type: SessionEvent.ResetSessionError };
    }
}
