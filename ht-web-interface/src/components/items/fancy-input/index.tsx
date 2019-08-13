import * as _ from "lodash";
import * as React from "react";

import { HorizontalFlow } from "../../base/flow/horizontal";

import { ObjectKeyLiteral } from "../../../utils/foundation/class";
import { Keys } from "../../../utils/input";

import { FancyInputProps } from "./FancyInputProps";
import { FancyInputState } from "./FancyInputState";

import "./styles.scss";

export class FancyInput extends React.Component<FancyInputProps, FancyInputState> {
    public state: FancyInputState = {
        currentChar: "",
        cursor:      0,
        value:       [],
    };

    public input: any = [];

    public componentDidMount() {
        if (this.props.value) {
            this.setState({ value: this.props.value.split("") });
            this.props.onChange(this.props.value);
            this.setState({
                currentChar: this.props.value.split("")[ 0 ],
            });
        }
    }

    public render() {
        return (
            <HorizontalFlow>
                {this.renderFields()}
            </HorizontalFlow>
        );
    }

    public blurFocus = () => this.input[this.state.cursor].blur();

    private renderFields = () => {
        return _.map(_.range(0, this.props.length), (__$, i) => {

            const changeFn = (e: any) => this.handleChange(e.target.value, i);
            const focusFn = () => this.focus(i);

            return (
                <input
                    ref={(ref) => {
                        this.input[ i ] = ref;
                    }}
                    onFocus={focusFn}
                    autoFocus={i === 0}
                    key={i}
                    value={this.props.type === "tel" ? (!_.isEmpty(this.state.value[ i ]) ? "*" : "") : (this.state.value[ i ] || "")}
                    type={this.props.type}
                    onChange={changeFn}
                    onKeyDown={this.handleKeyDown}
                    className={this.renderClass()}
                />
            );
        });
    };

    private focus = (i: number) => {
        if (this.input[ i ]) {
            this.input[ i ].focus();
        }

        this.setCursor(i);
        this.setState({ currentChar: this.state.value[ i ] || "" });
    };

    private renderClass = () => {
        const $ = [ "fi-wrapper__input" ];

        if (this.props.valid === false) {
            $.push("fi-wrapper__input--invalid");
        }

        return $.join(" ");
    };
    private setCursor = (cursor: number) => this.setState({ cursor });
    private handleChange = (char: string, index: number) => {
        const nextCursor = this.state.cursor + 1;
        const value = this.state.value;

        value[ index ] = char.replace(this.state.currentChar, "");
        if (this.props.type === "tel") {
            value[ index ] = char.replace("*", "");
        }

        let focusIndex = index;
        if (this.input[ nextCursor ]) {
            focusIndex = nextCursor;
        }

        this.focus(focusIndex);

        this.setState({ value });
        this.props.onChange(this.state.value.join(""));
    };

    private handleKeyDown = (e: any) => {
        const nextTarget = this.input[ this.state.cursor + 1 ];
        const prevTarget = this.input[ this.state.cursor - 1 ];
        if (!this.props.valid) {
            this.props.resetError();
        }
        const map: ObjectKeyLiteral = {
            [ Keys.Backspace ]: () => {
                e.preventDefault();

                const value = this.state.value;
                if (_.isEmpty(value[ this.state.cursor ]) && prevTarget) {
                    prevTarget.focus();
                    value[ this.state.cursor ] = "";
                    value[ this.state.cursor - 1 ] = "";
                    this.setState({ value, currentChar: this.state.value[ this.state.cursor - 1 ] });
                } else {
                    value[ this.state.cursor ] = "";
                    this.setState({ value, currentChar: "" });
                }

                this.props.onChange(this.state.value.join(""));
            },
            [ Keys.Right ]:     () => {
                e.preventDefault();
                return nextTarget && nextTarget.focus();
            },
            [ Keys.Left ]:      () => {
                e.preventDefault();
                return prevTarget && prevTarget.focus();
            },
            [ Keys.E ]:         () => {
                return this.props.type === "number" && e.preventDefault();
            },
            [ Keys.Minus ]:     () => {
                return this.props.type === "number" && e.preventDefault();
            },
            [ Keys.Dot ]:       () => {
                return this.props.type === "number" && e.preventDefault();
            },
            [ Keys.Comma ]:     () => {
                return this.props.type === "number" && e.preventDefault();
            },
            [ Keys.Tab ]:       () => {
                if (!e.shiftKey && this.state.cursor === this.props.length - 1) {
                    return null;
                }

                e.preventDefault();

                if (e.shiftKey) {
                    return prevTarget && prevTarget.focus();
                }
                return nextTarget && nextTarget.focus();
            },
        };

        if (map[ e.keyCode ]) {
            map[ e.keyCode ]();
        }

        if (this.props.type === "number" || this.props.type === "tel") {
            if ((e.key < "0" || e.key > "9") && (e.key !== "Enter" || e.key !== "*")) {
                return e.preventDefault();
            }
        }
    };
}
