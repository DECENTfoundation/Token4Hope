import * as _ from "lodash";

import { DefaultLanguage } from "../../constants/DefaultLanguage";
import { BaseEntityModel } from "./BaseEntityModel";
import { BaseTranslationModel } from "./BaseTranslationModel";

export abstract class BaseTranslatedModel<T extends BaseEntityModel<T>, U extends BaseTranslationModel<U>> extends BaseEntityModel<T> {

    public translations: U[];

    public get translation(): U {
        if (_.isNil(this.translations)) {
            return null;
        }
        if (!_.isEmpty(this.translations) && this.translations.length > 1) {
            return this.translations.find(($) => !_.isEqual(DefaultLanguage, $.language));
        }
        return _.first(this.translations);
    }
}
