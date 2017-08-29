import { Action } from '../../action';
import { ContactHoliday } from './contact-holiday';

export class ContactHolidayAction {
    public holidayKey: string;

    constructor(
        public action: Action,
        public holiday?: ContactHoliday,
    ) { }

}
