import { Action } from '../action';

export class Event {
    constructor(
        public description: string,
        public kalendarDate: string // yyyy-MM-dd
    ) { }
}

export class EventAction {
    public datesToAdd: Date[] = [];
    public eventKey: string;

    constructor(
        public action: Action,
        public event?: Event
    ) {}
}
