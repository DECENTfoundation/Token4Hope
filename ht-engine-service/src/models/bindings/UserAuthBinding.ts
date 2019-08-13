import * as Hapi from "hapi";

import { ContainerModule } from "inversify";

import { UsersController } from "../../controllers/api/v1/UsersController";
import { AuthIdentityPolicy } from "../../plugins/auth";
import { OrmModelProvider } from "../../plugins/orm";
import { RestMethod } from "../../utils/http";
import { Payload } from "../../utils/payload";
import { User } from "../entities/User";

export const UserAuthBinding = (): ContainerModule => {
    return new ContainerModule((bind) => {
        bind<OrmModelProvider>(RestMethod.Signin).toProvider<User>((context) => {
            return async (source: Hapi.Request, ...args: any[]): Promise<User> => {
                const payload = source.payload as Payload;
                const user = await User.authenticate(AuthIdentityPolicy.Email, payload);

                return user;
            };
        }).whenInjectedInto(UsersController.name);
    });
};
