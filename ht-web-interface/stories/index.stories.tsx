import * as React from "react";

import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";

import { withKnobs } from "@storybook/addon-knobs";

import { ActionLayouts } from "./components/ActionLayouts";
import { Balances } from "./components/Balances";
import { Buttons } from "./components/Buttons";
import { Cards } from "./components/Cards";
import { Containers } from "./components/Containers";
import { FancyInputs } from "./components/FancyInputs";
import { HeaderStory } from "./components/Header";
import { Inputs } from "./components/Inputs";
import { Tables } from "./components/Tables";
import { TooltipStory } from "./components/TooltipStory";
import { Typography } from "./components/Typography";

import { storiesOf } from "@storybook/react";

import "../assets/styles/main.scss";
import "./assets/styles/storybook.scss";

storiesOf("Base Components", module)
    .addDecorator(withKnobs)
    .add("Typography", () => <Typography />)
    .add("Buttons", () => <Buttons />)
    .add("Inputs", () => <Inputs />)
    .add("Fancy Inputs", () => <FancyInputs />)
    .add("Tables", () => <Tables />)
    .add("Tooltip", () => <TooltipStory />);

storiesOf("Items", module)
    .addDecorator(withKnobs)
    .add("Card number", () => <Cards />)
    .add("Balances", () => <IntlProvider locale="en"><Balances /></IntlProvider>);

storiesOf("Layouts", module)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("Header", () => <HeaderStory />)
  .add("Containers", () => <Containers />)
  .add("Action Layouts", () => <ActionLayouts />);
