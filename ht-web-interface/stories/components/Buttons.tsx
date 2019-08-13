import * as React from "react";

import { Button } from "../../src/components/base/button";
import { ButtonType } from "../../src/components/base/button/ButtonType";
import { HorizontalFlow } from "../../src/components/base/flow/horizontal";
import { VerticalFlow } from "../../src/components/base/flow/vertical";
import { Text } from "../../src/components/base/text";

export const Buttons = () => {
    return (
        <HorizontalFlow verticalAlign="flex-start" spacing="flex-start" className="storybook__wrapper">
            <VerticalFlow>
                <div className="storybook__wrapper--horizontal">
                    <Text type="body2">Primary buttons</Text>
                    <div className="storybook__divider" />
                    <Button arrow="right">Default</Button>
                    <div className="storybook__divider" />
                    <Button arrow="right" disabled={true}>Disabled</Button>
                </div>
                <div className="storybook__wrapper--horizontal">
                    <Text type="body2">Primary with bottom arrows</Text>
                    <div className="storybook__divider" />
                    <Button arrow="bottom">Default</Button>
                    <div className="storybook__divider" />
                    <Button arrow="bottom" disabled={true}>Disabled</Button>
                </div>
            </VerticalFlow>
            <VerticalFlow>
                <div className="storybook__wrapper--horizontal">
                    <Text type="body2">Secondary buttons</Text>
                    <div className="storybook__divider" />
                    <Button arrow="right" type={ButtonType.Secondary}>Default</Button>
                    <div className="storybook__divider" />
                    <Button arrow="right" type={ButtonType.Secondary} disabled={true}>Disabled</Button>
                </div>
                <div className="storybook__wrapper--horizontal">
                    <Text type="body2">Secondary with bottom arrow</Text>
                    <div className="storybook__divider" />
                    <Button arrow="bottom" type={ButtonType.Secondary}>Default</Button>
                    <div className="storybook__divider" />
                    <Button arrow="bottom" type={ButtonType.Secondary} disabled={true}>Disabled</Button>
                </div>
            </VerticalFlow>
            <VerticalFlow>
                <div className="storybook__wrapper--horizontal">
                    <Text type="body2">Tertiary buttons</Text>
                    <div className="storybook__divider" />
                    <Button type={ButtonType.Tertiary}>Default</Button>
                    <div className="storybook__divider" />
                    <Button type={ButtonType.Tertiary} disabled={true}>Disabled</Button>
                </div>
                <div className="storybook__wrapper--horizontal">
                    <Text type="body2">Tertiary with back arrow</Text>
                    <div className="storybook__divider" />
                    <Button arrow="left" type={ButtonType.Tertiary}>Default</Button>
                    <div className="storybook__divider" />
                    <Button arrow="left" type={ButtonType.Tertiary} disabled={true}>Disabled</Button>
                </div>
            </VerticalFlow>
        </HorizontalFlow>
    );
};
