import { Action } from '../action';

export class Contact {
    constructor(
        public user: string,
        public firstname: string,
        public lastname: string,
        public gender: string,
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
