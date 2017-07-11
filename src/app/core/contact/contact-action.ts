import { Contact } from './contact';
import { Action } from '../action';

export class ContactAction {
    public contactKey: string;

    constructor(
        public action: Action,
        public contact?: Contact
    ) { }

}
