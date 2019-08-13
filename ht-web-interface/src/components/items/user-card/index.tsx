import * as _ from "lodash";
import * as React from "react";

import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { HorizontalFlow } from "../../base/flow/horizontal";
import { VerticalFlow } from "../../base/flow/vertical";
import { Text } from "../../base/text";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import { UserCardProps } from "./UserCardProps";

import "./styles.scss";

const dropdown = require("./images/dropdown.svg");
const avatar = require("./images/avatar.svg");

export const UserCard = ({ className, email }: UserCardProps) => {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen(!open);
    let userCardRef: any;

    const setUserCardRef = (ref: Node) => {
        if (!_.isNil(ref)) {
            userCardRef = ref;
        }
    };

    const handleClickOutside = (event: Event) => {
        if (!userCardRef.contains(event.target)) {
            setOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ UserCard ]);

    return (
        <div onClick={toggleOpen} ref={setUserCardRef} className={renderClassConditions("user-card__wrapper", {open}, className)}>
            <img className="user-card__wrapper__avatar" src={avatar}/>
            <Text className="ml-30 mr-30">{email}</Text>
            <img className="user-card__wrapper__dropdown-icon" src={dropdown}/>
            <CSSTransition in={open} classNames="user-card__list" timeout={0} unmountOnExit={true}>
                <VerticalFlow className={renderClassConditions("user-card__list", {open})}>
                    <HorizontalFlow spacing="flex-start" className="user-card__list__item">
                        <Link to="/password/new"><Text type="body" className="user-card__list__item__title">Passwort ändern</Text></Link>
                    </HorizontalFlow>
                </VerticalFlow>
            </CSSTransition>
        </div>
    );
};
