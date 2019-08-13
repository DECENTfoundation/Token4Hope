import * as React from "react";

import { VerticalFlow } from "../../src/components/base/flow/vertical";
import { Input } from "../../src/components/base/input";
import { Label } from "../../src/components/base/label";
import { Text } from "../../src/components/base/text";

export const Inputs = () => {
    return (
        <VerticalFlow className="storybook__wrapper">
            <Input placeholder="Placeholder" type="text" />
            <div className="storybook__divider" />
            <Input value="Disabled" disabled={true} placeholder="Placeholder" type="text" />
            <div className="storybook__divider" />
            <Label label="Label text"/>
            <Input placeholder="Placeholder" type="text" />
            <div className="storybook__divider" />
            <Label label="Required label" required={true}/>
            <Input type="email" value="Invalid input" />
            <Text type="caption" color="#DF2700">Validation text error</Text>
        </VerticalFlow>
    );
};
