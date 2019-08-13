import * as React from "react";

import { Container } from "../../src/components/base/container";
import { Text } from "../../src/components/base/text";
import { ActionContainer } from "../../src/components/items/action-container";
import { DataList } from "../../src/components/items/dataList";
import { FancyInput } from "../../src/components/items/fancy-input";
import { StatusMessage } from "../../src/components/items/status-message";

const dataMock = [["Amount", "123 HT"], ["Sender", "dw-91824919f571825f07da"], ["Recipient", "dw-31132asddf"], ["Balance", "123 HT"]];
const title = "Zahlung wurde erfolgreich durchgeführt";
const subTitle = "Der Auftrag wird durchgeführt, sobald er durch das Hilfswerk geprüft wurde";

export const ActionLayouts = () => {
    return (
        <>
            <div className="storybook__header">
                Standard + header with offset + multiple actions
            </div>
            <ActionContainer primaryTitle="Action" secondaryTitle="Back" offset={true} header={<Text type="h5">Title</Text>}>
                <Text type="h6">Bitte 6-stellige Hilfswerk ID Nummer eingeben</Text>
                <div className="storybook__divider" />
                <FancyInput value="" type="number" length={6} />
            </ActionContainer>

            <div className="storybook__divider" />

            <div className="storybook__header storybook__header--success">
                Vertical statusMessage + single action
            </div>
            <ActionContainer primaryTitle="Single Action">
                <StatusMessage success={true} title={title} subTitle={subTitle}/>
            </ActionContainer>

            <div className="storybook__divider" />

            <div className="storybook__header storybook__header--success">
                Horizontal statusMessage + Offset
            </div>
            <ActionContainer primaryTitle="Action" secondaryTitle="Back" offset={true}>
                <StatusMessage success={true} title={title} vertical={true}/>
            </ActionContainer>

            <div className="storybook__header storybook__header--success">
                StatusMessage + Offset + Some content
            </div>
            <ActionContainer primaryTitle="Single Action" offset={true}>
                <StatusMessage success={true} title={title} vertical={true}/>
                <DataList data={dataMock} fullWidth={true}/>
            </ActionContainer>

            <div className="storybook__divider" />

            <div className="storybook__header storybook__header--error">
                Standard error
            </div>
            <Container offset={true}>
                <StatusMessage
                    success={false}
                    title="There has been an issue connecting to the server"
                    subTitle="Please try again later."
                />
            </Container>
        </>
    );
};
