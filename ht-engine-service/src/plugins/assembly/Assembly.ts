import { interfaces } from "inversify";

export interface Assembly {
  getContainer(): interfaces.Container;
}
