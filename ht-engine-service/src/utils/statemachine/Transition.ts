export class Transition<State> {
    constructor(
        public fromState: State,
        public event: string,
        public executor: (...args: any[]) => Promise<void>,
        public toState: State,
    ) { }
}
