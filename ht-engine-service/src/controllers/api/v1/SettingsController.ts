import { injectable } from "inversify";

import { Setting } from "../../../models/entities/Setting";

import { BaseController } from "../../base/BaseController";

@injectable()
export class SettingsController extends BaseController<Setting> {
}
