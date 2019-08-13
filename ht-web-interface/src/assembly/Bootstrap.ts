import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

import { Bootstrap as Components } from "../components/Bootstrap";

import { Bootstrap as Models } from "../models/Bootstrap";
import { RestGateway } from "../services/base/rest";
import { Bootstrap as Services } from "../services/Bootstrap";

const boot = new Container();

boot.bind(RestGateway.Default).toConstantValue(require("../../config/api/gateway.js"));

boot.bind("theme").toConstantValue(require("../../config/theme.json"));

boot.load(...[
    Models(),
    Services(),
    Components(),
]);

export const { lazyInject } = getDecorators(boot, true);

export const container = boot;
