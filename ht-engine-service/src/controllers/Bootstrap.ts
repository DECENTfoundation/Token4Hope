import { ContainerModule } from "inversify";
import { BalanceController } from "./api/v1/BalanceController";

import { ChainAccountController } from "./api/v1/ChainAccountController";
import { FamiliesController } from "./api/v1/FamiliesController";
import { MonitoringController } from "./api/v1/MonitoringController";
import { SettingsController } from "./api/v1/SettingsController";

import { TransactionController } from "./api/v1/TransactionController";
import { UsersController } from "./api/v1/UsersController";
import { Controller } from "./base/Controller";

export const Bootstrap = (): ContainerModule => {
    return new ContainerModule((bind) => {
        bind<Controller>(UsersController.name).to(UsersController);
        bind<Controller>(ChainAccountController.name).to(ChainAccountController);
        bind<Controller>(MonitoringController.name).to(MonitoringController);
        bind<Controller>(SettingsController.name).to(SettingsController);
        bind<Controller>(FamiliesController.name).to(FamiliesController);
        bind<Controller>(BalanceController.name).to(BalanceController);
        bind<Controller>(TransactionController.name).to(TransactionController);
    });
};
