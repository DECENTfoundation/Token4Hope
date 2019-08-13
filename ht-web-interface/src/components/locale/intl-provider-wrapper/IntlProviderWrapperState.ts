import { Translations } from "../../../utils/locale/Translations";

export interface IntlProviderWrapperState {
    locale: string;
    messages: Translations;
    key: string;
}
