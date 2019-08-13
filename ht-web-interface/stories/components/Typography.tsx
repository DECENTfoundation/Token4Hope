import * as React from "react";

import { text } from "@storybook/addon-knobs";

import { Text } from "../../src/components/base/text";

export const Typography = () => {
    return (
        <div className="storybook__wrapper">
            <Text type="h1">{text("Headline 1", "Headline 1")}</Text>
            <div className="storybook__divider" />
            <Text type="h2">{text("Headline 2", "Headline 2")}</Text>
            <div className="storybook__divider" />
            <Text type="h3">{text("Headline 3", "Headline 3")}</Text>
            <div className="storybook__divider" />
            <Text type="h4">{text("Headline 4", "Headline 4")}</Text>
            <div className="storybook__divider" />
            <Text type="h5">{text("Subtitle 1", "Subtitle 1")}</Text>
            <div className="storybook__divider" />
            <Text type="h6">{text("Subtitle 2", "Subtitle 2")}</Text>
            <div className="storybook__divider" />
            <Text type="body">{text("Body 1", "Body 1")}</Text>
            <div className="storybook__divider" />
            <Text type="body2">{text("Body 2", "Body 2")}</Text>
            <div className="storybook__divider" />
            <Text type="caption">{text("Caption", "Caption")}</Text>
        </div>
    );
};
