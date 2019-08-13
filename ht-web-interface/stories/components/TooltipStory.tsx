import * as React from "react";

import { Text } from "../../src/components/base/text";
import { Tooltip } from "../../src/components/items/tooltip";

export const TooltipStory = () => {
    return (
        <div className="storybook__wrapper">
            <Text type="body2">Tooltip</Text>
            <div className="storybook__divider" />
            <Tooltip label="This is informative tooltip that goes in two lines." />
        </div>
    );
};
