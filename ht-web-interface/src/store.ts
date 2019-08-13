import { ContextStoreFactory } from "./models/context";
import { SessionAction } from "./models/session";

export const store = ContextStoreFactory.buildStore(process.env.NODE_ENV === "development");

store.dispatch(SessionAction.current);
