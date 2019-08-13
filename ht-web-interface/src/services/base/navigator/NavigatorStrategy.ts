import { Observable } from "rxjs";

import { Locale } from "../../../utils/locale";
import { Translations } from "../../../utils/locale/Translations";

export interface NavigatorStrategy {
    language: string;
    locale: string;
    currentLocale: Observable<string>;

    changeLocale: (locale: Locale) => void;
    setDefaultLocale: () => void;
    getLanguagePack(locale: Locale | string): Translations;
}
