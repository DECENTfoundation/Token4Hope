import * as React from "react";

import { Container } from "../../src/components/base/container";

export const Containers = () => {
    const text = "The standard Lorem Ipsum passage, used since the 1500s\n" +
        "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \n" +
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \n" +
        "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure \n" +
        "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \n" +
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"\n" +
        "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC";

    return (
        <div>
            <div className="storybook__header">
                Standard
            </div>
            <Container>
                {text}
            </Container>
            <div className="storybook__header">
                Standard + Offset
            </div>
            <Container offset={true}>
                {text}
            </Container>
            <div className="storybook__header">
                Fullwidth
            </div>
            <Container fullWidth={true}>
                {text}
            </Container>
            <div className="storybook__header">
                Fullwidth + Offset
            </div>
            <Container offset={true} fullWidth={true}>
                {text}
            </Container>
        </div>
    );
};
