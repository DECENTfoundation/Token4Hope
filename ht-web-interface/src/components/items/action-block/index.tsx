import * as React from "react";

import { Button } from "../../base/button";
import { ButtonType } from "../../base/button/ButtonType";
import { VerticalFlow } from "../../base/flow/vertical";
import { Text } from "../../base/text";

import { ActionBlockProps } from "./ActionBlockProps";

import "./styles.scss";

export const ActionBlock = (props: ActionBlockProps) => {
    return (
        <VerticalFlow className="action-block">
            <Text type="h4">{props.title}</Text>
            <Text className="action-block__content" color="#67696D">
                {props.content}
            </Text>
            <Button to={props.buttonLink} className="action-block__button" type={ButtonType.Secondary} arrow="right">
                {props.buttonText}
            </Button>
        </VerticalFlow>
    );
};
