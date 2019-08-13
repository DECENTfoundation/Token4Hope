import * as Boom from "boom";
import * as Hapi from "hapi";
import * as _ from "lodash";

import { EntityKeyError } from "../../models/constants/EntityKeyError";
import { ErrorEvent } from "../../models/events/ErrorEvent";
import { Transition } from "./Transition";

export class StateMachine<State> {

    protected current: State;

    public constructor(
        protected transitions: Array<Transition<State>>,
        protected requestEvents: string[] = [],
    ) { }

    public addTransitions(transitions: Array<Transition<State>>) {
        this.transitions = _.concat(this.transitions, transitions);
    }

    public addRequestEvents(events: string[]) {
        this.requestEvents = _.concat(this.requestEvents, events);
    }

    public initialize(current: State) {
        this.current = current;
    }

    public get state(): State {
        return this.current;
    }

    public getTransition(event: string): Transition<State> {
        return _.first(
            this.transitions.filter((t) => (t.fromState === this.current && t.event === event)),
        );
    }

    public canTrigger(event: string): boolean {
        return !_.isUndefined(this.getTransition(event));
    }

    public isFinal(): boolean {
        return _.isEmpty(
            this.transitions.filter((t) => (t.fromState === this.current)),
        );
    }

    public async trigger(request: Hapi.Request, ...args: any[]): Promise<Transition<State>> {
        const event = request.params.event;
        if (_.includes(this.requestEvents, event)) {
            return await this.triggerEvent(request.params.event, ...[request, ...args]);
        }

        throw Boom.conflict<ErrorEvent<EntityKeyError>>(
            `Invalid event: ${event}, for current state: '${this.current}'`, { key: EntityKeyError.InvalidState, entity: event },
        );
    }

    public async triggerEvent(event: string, ...args: any[]): Promise<Transition<State>> {
        const transition = this.getTransition(event);
        if (!_.isUndefined(transition)) {
            try {
                await transition.executor(...args);
                this.current = transition.toState;

                return transition;
            } catch (error) {
                throw Boom.boomify(error);
            }
        }

        throw Boom.conflict<ErrorEvent<EntityKeyError>>(
            `Invalid event: ${event}, for current state: '${this.current}'`, { key: EntityKeyError.InvalidState, entity: event },
        );
    }
}
