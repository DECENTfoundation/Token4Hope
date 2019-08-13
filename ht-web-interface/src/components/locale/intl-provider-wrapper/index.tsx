import Http, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as Moment from "moment";
import * as React from "react";

import { interfaces } from "inversify";
import { addLocaleData, IntlProvider } from "react-intl";
import { Subscription } from "rxjs";

import { container, lazyInject } from "../../../assembly/Bootstrap";

import { HttpHeader } from "../../../services/base/http/HttpHeader";
import { NavigatorStrategy } from "../../../services/base/navigator/NavigatorStrategy";

import { IntlProviderWrapperState } from "./IntlProviderWrapperState";

import * as en from "react-intl/locale-data/en";

export class IntlProviderWrapper extends React.Component<{}, IntlProviderWrapperState> {
    public state: IntlProviderWrapperState = {
        key: null,
        locale: null,
        messages: null,
    };

    @lazyInject("NavigatorService")
    private navigator: NavigatorStrategy;

    private $subscription: Subscription;

    public componentWillMount() {
        addLocaleData(en);

        this.navigator.setDefaultLocale();

        this.$subscription = this.navigator.currentLocale.subscribe((locale) => {

            if (container.isBound("Factory<AxiosInstance>")) {
                container.rebind<interfaces.Factory<AxiosInstance>>("Factory<AxiosInstance>").toFactory<AxiosInstance>(() => {
                    return ((config?: AxiosRequestConfig): AxiosInstance => Http.create({
                        ...config,
                        headers: { ...config.headers, [HttpHeader.AcceptLanguage]: locale },
                    }));
                });
            }

            Moment.locale("de_AT");

            this.setState({
                key: locale,
                locale,
            });
        });
    }

    public componentWillUnmount() {
        this.$subscription.unsubscribe();
    }

    public render() {
        return (
            <IntlProvider {...this.state} >
                {this.props.children}
            </IntlProvider>
        );
    }
}
