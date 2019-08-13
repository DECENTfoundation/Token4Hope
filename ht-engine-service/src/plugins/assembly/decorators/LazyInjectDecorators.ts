import getDecorators from "inversify-inject-decorators";
import { container } from "../AssemblyPlugin";

export const {
  lazyInject,
  lazyMultiInject,
  lazyInjectNamed,
  lazyInjectTagged,
} = getDecorators(container);
