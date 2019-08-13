export function Fsm<State>(options: {
    requestEvents?: string[],
    transitions?: Array<[State, string, string, State]>;
}): (target: any) => void {
    return (target: any) => {
        target.prototype.fsmTransitions = options.transitions || [];
        target.prototype.fsmEvents = options.requestEvents || [];
    };
}
