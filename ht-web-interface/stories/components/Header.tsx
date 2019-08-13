import * as React from "react";

import { Text } from "../../src/components/base/text";
import { Header } from "../../src/components/layouts/header";

export const HeaderStory = () => {
    return (
        <>
            <Text type="body2">Logged in state</Text>
            <Header />
            <div className="storybook__divider" />
            <Text type="body2">Logged out state</Text>
            <Header />
            <div className="storybook__divider" />
            <Text type="body2">with Title</Text>
            <Header title="Register new Family" />
        </>
    );
};
