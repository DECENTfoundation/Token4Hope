import * as _ from "lodash";

import { inject, injectable } from "inversify";
import { BehaviorSubject, Observable } from "rxjs";

import { container } from "../../../assembly/Bootstrap";

import { Locale, LocaleSet } from "../../../utils/locale";
import { Translations } from "../../../utils/locale/Translations";

import { NavigatorStrategy } from "./NavigatorStrategy";

@injectable()
export class NavigatorService implements NavigatorStrategy {

    protected navigator: Navigator;

    private locale$: BehaviorSubject<string>;

    constructor(
        @inject("Storage")
        public storage: Storage,
    ) {
        this.locale$ = new BehaviorSubject(
            this.storage.getItem("locale"),
        );
        try {
            this.navigator = window.navigator;
        } catch (error) {
            // TODO: not required right now
        }
    }

    public setDefaultLocale() {
        if (_.isNil(this.storage.getItem("locale"))) {
            this.changeLocale(this.locale as Locale);
        }
    }

    public get language(): string {
        return this.navigator.language;
    }

    private get languages(): ReadonlyArray<string> {
        return this.navigator.languages;
    }

    public get locale(): string {
        return _.first(this.languages.filter(($) => _.includes(LocaleSet.All, $))) || Locale.EN;
    }

    public get currentLocale(): Observable<string> {
        return this.locale$.asObservable();
    }

    public getLanguagePack(locale: Locale | string): Translations {
        return container.get(locale.toString());
    }

    public changeLocale(locale: Locale) {
        this.storage.setItem("locale", locale);
        this.locale$.next(locale);
    }
}
