import { ContainerModule } from "inversify";

export const Bootstrap = (): ContainerModule => {
    return new ContainerModule((bind) => {
        // tslint:disable-next-line:no-console
        console.log("Model bootstrap registered");
    });
};
