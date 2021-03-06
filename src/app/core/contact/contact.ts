import { Action } from '../action';

export class Contact {
    constructor(
        public firstname: string,
        public lastname: string,
        public birthdate: string // yyyy-MM-dd
    ) { }
}

export class ContactAction {
    public contactKey: string;

    constructor(
        public action: Action,
        public contact?: Contact
    ) { }
}
