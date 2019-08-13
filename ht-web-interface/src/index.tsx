import "babel-polyfill"; // temp. workaround for regeneratorRuntime referenceError
import "reflect-metadata";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ModalDOM from "react-modal";

import { createMuiTheme as ThemeFactory, MuiThemeProvider as ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import "../assets/styles/main.scss";

import { IntlProviderWrapper } from "./components/locale/intl-provider-wrapper";
import { Router } from "./components/router";

import { container } from "./assembly/Bootstrap";

import { store } from "./store";

const theme = ThemeFactory(container.get("theme"));

ModalDOM.setAppElement("#humanity-token");
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <IntlProviderWrapper>
                <Router />
            </IntlProviderWrapper>
        </ThemeProvider>
    </Provider>,
    document.getElementById("humanity-token"),
);
