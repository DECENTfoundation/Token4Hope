import * as React from "react";

import { CardNumber } from "../../src/components/items/card-number";

export const Cards = () => {
    return (
        <div className="storybook__wrapper">
            <CardNumber cardNumber={542123}/>
        </div>
    );
};
