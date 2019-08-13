import * as React from "react";

import { CSSTransition } from "react-transition-group";

import { renderClass } from "../../../helpers/classes/ClassRenderer";
import { ExposeLoading } from "../../../utils/expose";
import { ClassName } from "../../../utils/react";

import "./styles.scss";

export const Loader = ({ className, loading }: ExposeLoading & ClassName) => (
    <CSSTransition in={loading} classNames="loader" timeout={300} unmountOnExit={true}>
        <div className={renderClass("loader-wrapper ml-15 mr-15", className)}>
            <div className="loader-wrapper__loader">
                <svg
                    className="loader-wrapper__loader__spinner"
                    width="35px"
                    height="35px"
                    viewBox="0 0 66 66"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="loader-wrapper__loader__spinner__path"
                        fill="none"
                        strokeWidth="5"
                        strokeLinecap="round"
                        cx="33"
                        cy="33"
                        r="30"
                    />
                </svg>
            </div>
        </div>
    </CSSTransition>
);
