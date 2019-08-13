import * as React from "react";

import { HorizontalFlow } from "../../src/components/base/flow/horizontal";
import { VerticalFlow } from "../../src/components/base/flow/vertical";
import { Text } from "../../src/components/base/text";
import { FancyInput } from "../../src/components/items/fancy-input";

export const FancyInputs = () => {
    const [ numValue, setNumValue ] = React.useState("");
    const [ pinValue, setPinValue ] = React.useState("");
    const [ textValue, setTextValue ] = React.useState("");
    const [ invalidValue, setInvalidValue ] = React.useState("");

    return (
        <HorizontalFlow verticalAlign="flex-start" spacing="flex-start" className="storybook__wrapper">
            <VerticalFlow>
                <VerticalFlow>
                    <Text type="body2">ID Input</Text>
                    <div className="storybook__divider" />
                    {/*tslint:disable-next-line:jsx-no-lambda*/}
                    <FancyInput onChange={($) => setNumValue($)} value="938" type="number" length={6} />
                    <div className="storybook__divider" />
                    <Text type="h6">Value: {numValue}</Text>
                </VerticalFlow>
                <div className="storybook__divider" />
                <VerticalFlow>
                    <Text type="body2">Text Input</Text>
                    <div className="storybook__divider" />
                    {/*tslint:disable-next-line:jsx-no-lambda*/}
                    <FancyInput onChange={($) => setTextValue($)} value="text" type="text" length={6} />
                    <div className="storybook__divider" />
                    <Text type="h6">Value: {textValue}</Text>
                </VerticalFlow>
            </VerticalFlow>
            <div className="storybook__wrapper--horizontal" />
            <VerticalFlow>
                <VerticalFlow>
                    <Text type="body2">PIN Input</Text>
                    <div className="storybook__divider" />
                    {/*tslint:disable-next-line:jsx-no-lambda*/}
                    <FancyInput onChange={($) => setPinValue($)} value="333" type="password" length={4} />
                    <div className="storybook__divider" />
                    <Text type="h6">Value: {pinValue}</Text>
                </VerticalFlow>
                <div className="storybook__divider" />
                <VerticalFlow>
                    <Text type="body2">Invalid input</Text>
                    <div className="storybook__divider" />
                    {/*tslint:disable-next-line:jsx-no-lambda*/}
                    <FancyInput onChange={($) => setInvalidValue($)} valid={false} value="333" type="password" length={4} />
                    <div className="storybook__divider" />
                    <Text type="h6">Value: {invalidValue}</Text>
                </VerticalFlow>
            </VerticalFlow>
        </HorizontalFlow>
    );
};
