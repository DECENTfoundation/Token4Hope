import * as React from "react";

import { FormattedHTMLMessage } from "react-intl";

import { TextProps } from "./TextProps";

export class Text extends React.Component<TextProps, {}> {
    public render() {
        return (
            <span
                style={{ display: "block", color: this.props.color || "default", margin: this.props.noMargin ? 0 : "default" }}
                className={`${this.props.type || "body"} ${this.props.className || null}`}
                id={this.props.id && this.props.id}
            >
                {/* tslint:disable-next-line:max-line-length */}
                {this.props.id ? <FormattedHTMLMessage id={this.props.id} defaultMessage={this.props.defaultMessage || this.props.children as string} values={this.props.messageValues} /> : this.props.children}
            </span>
        );
    }
}
