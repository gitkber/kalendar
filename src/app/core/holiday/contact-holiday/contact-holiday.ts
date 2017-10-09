import { Action } from '../../action';

export class ContactHoliday {
    constructor(
        public user: string,
        public contactUID: string,
        public description: string,
        public date: string // yyyy-MM-dd
    ) { }
}

export class ContactHolidayAction {
    public holidayKey: string;

    constructor(
        public action: Action,
        public holiday?: ContactHoliday,
    ) { }
}
