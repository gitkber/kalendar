import { Action } from '../../action';

export class PublicHoliday {
    constructor(
        public user: string,
        public description: string,
        public date: string // yyyy-MM-dd
    ) { }
}

export class PublicHolidayAction {
    public holidayKey: string;

    constructor(
        public action: Action,
        public holiday?: PublicHoliday,
    ) { }
}
