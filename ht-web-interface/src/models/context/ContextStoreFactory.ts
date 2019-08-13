import { applyMiddleware, createStore, Middleware, Store, StoreEnhancerStoreCreator } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import Thunk from "redux-thunk";

import { AccountEpics } from "../account";
import { BalanceEpics } from "../balance";
import { BalancesEpics } from "../balances";
import { FamilyEpics } from "../family";
import { PaymentEpics } from "../payment";
import { SessionEpics } from "../session";
import { TransactionsEpics } from "../transactions";

import { ErrorMiddleware } from "../../middleware/error";

import { ContextReducer } from "./ContextReducer";
import { ContextState } from "./ContextState";

export class ContextStoreFactory {
    public static buildStore(debug: boolean = false): Store<ContextState> {
        let store;

        const Epics = combineEpics(...[
            SessionEpics, AccountEpics, BalanceEpics, BalancesEpics, FamilyEpics, TransactionsEpics, PaymentEpics,
        ]);

        const epicMiddleware = createEpicMiddleware();

        const middlewares = [
            Thunk, epicMiddleware, ErrorMiddleware,
        ] as Middleware[];

        const storeFactory: StoreEnhancerStoreCreator<ContextState> = applyMiddleware(
            ...middlewares,
        )(createStore) as StoreEnhancerStoreCreator<ContextState>;

        if (debug) {
            const tools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
            store = storeFactory(ContextReducer, tools);
            epicMiddleware.run(Epics);
            return store;
        }

        store = storeFactory(ContextReducer);
        epicMiddleware.run(Epics);
        return store;
    }
}
