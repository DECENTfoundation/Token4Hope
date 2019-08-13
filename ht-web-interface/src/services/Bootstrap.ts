import * as _ from "lodash";
import * as Qs from "qs";

import Http, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ContainerModule, interfaces } from "inversify";

import { Params, ParamsTransformer } from "../utils/data";

import { HttpFactory } from "./base/http/HttpFactory";
import { RestGateway } from "./base/rest";
import { StorageService } from "./base/storage/StorageService";

import { AccountService } from "./account/AccountService";
import { BalanceCardService } from "./balance-card/BalanceCardService";
import { BalanceChainService } from "./balance-chain/BalanceChainService";
import { BalancesService } from "./balances/BalancesService";
import { NavigatorService } from "./base/navigator/NavigatorService";
import { FamilyService } from "./family/FamilyService";
import { PaymentService } from "./payment/PaymentService";
import { SessionService } from "./session/SessionService";
import { TransactionsService } from "./transactions/TransactionsService";

export const Bootstrap = (): ContainerModule => {
    return new ContainerModule((bind) => {

        // Http service

        bind<interfaces.Factory<ParamsTransformer>>("Factory<ParamsTransformer>").toFactory<ParamsTransformer>((context) => {
            return ((params?: Params): ParamsTransformer => ({
                params, paramsSerializer: (arg: Params) => Qs.stringify(arg),
            }));
        });
        bind<interfaces.Factory<AxiosInstance>>("Factory<AxiosInstance>").toFactory<AxiosInstance>((context) => {
            return ((config?: AxiosRequestConfig): AxiosInstance => Http.create(config));
        });

        bind<AxiosInstance>("AxiosInstance").toDynamicValue((context) => {
            const config = context.container.get(RestGateway.Default);
            return context.container.get<HttpFactory>("Factory<AxiosInstance>")(config);
        }).whenAnyAncestorMatches((request: interfaces.Request) => {
            return _.isMatch((request.target.serviceIdentifier as any).prototype, { [ RestGateway.Name ]: RestGateway.Default });
        });

        // Storage service

        bind<StorageService>(StorageService).toSelf().inSingletonScope();
        bind<Storage>("Storage").toDynamicValue((context) =>
            context.container.get<StorageService>(StorageService).storage,
        );

        // Navigator service

        bind<NavigatorService>("NavigatorService").to(NavigatorService).inSingletonScope();

        // Session service

        bind<SessionService>(SessionService).toSelf();
        bind<AccountService>(AccountService).toSelf();
        bind<BalanceCardService>(BalanceCardService).toSelf();
        bind<BalancesService>(BalancesService).toSelf();
        bind<BalanceChainService>(BalanceChainService).toSelf();
        bind<TransactionsService>(TransactionsService).toSelf();
        bind<FamilyService>(FamilyService).toSelf();
        bind<PaymentService>(PaymentService).toSelf();
    });
};
