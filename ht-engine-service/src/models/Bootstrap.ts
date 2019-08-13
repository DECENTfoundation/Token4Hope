import { ContainerModule, interfaces } from "inversify";
import { Sequelize } from "sequelize-typescript";

import { OrmModelProvider, OrmOptions, OrmProvider, OrmQuery, OrmQueryTarget } from "../plugins/orm";

import { FamilyBinding } from "./bindings/FamilyBinding";
import { UserAuthBinding } from "./bindings/UserAuthBinding";
import { UserBinding } from "./bindings/UserBinding";

export const Bootstrap = (): ContainerModule[] => {

    const orm = new ContainerModule((bind) => {

        bind<OrmProvider>("OrmProvider").toProvider<Sequelize>((context) => {
            return async (options: OrmOptions): Promise<Sequelize> => {
                return new Sequelize(options);
            };
        });

        bind<interfaces.Factory<OrmModelProvider>>("Factory<OrmModelProvider>>").toFactory<OrmModelProvider>((context) => {
            return (query: OrmQuery, target: OrmQueryTarget): OrmModelProvider => context.container.getNamed(query, target.target);
        });
    });

    return [orm, ...[
        UserBinding(),
        UserAuthBinding(),
        FamilyBinding(),
    ]];
};
