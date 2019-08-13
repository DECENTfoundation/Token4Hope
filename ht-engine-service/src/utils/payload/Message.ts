import { Payload } from "./Payload";

export interface Message<Event> {
    name: Event;
    payload: Payload;
}
