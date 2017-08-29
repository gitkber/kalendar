import { Action } from '../../action';
import { PublicHoliday } from './public-holiday';

export class PublicHolidayAction {
    public holidayKey: string;

    constructor(
        public action: Action,
        public holiday?: PublicHoliday,
    ) { }

}
