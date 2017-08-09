import { Observable } from 'rxjs/Observable';

export class PublicHoliday {

    constructor(
        public user: string,
        public year: string,
        public items: Observable<PublicHolidayItem>
    ) { }

}

export class PublicHolidayItem {

    constructor(
        public description: string,
        public date: string // yyyy-MM-dd
    ) { }
}

