import { FirebaseListObservable } from 'angularfire2/database';

export class PublicHoliday {

    constructor(
        public user: string,
        public year: string,
        public items: FirebaseListObservable<PublicHolidayItem>
    ) { }

}

export class PublicHolidayItem {

    constructor(
        public description: string,
        public date: string // yyyy-MM-dd
    ) { }
}

