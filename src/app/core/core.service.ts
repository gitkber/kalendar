import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { ContactService } from './contact/contact.service';
import { MemoService } from './memo/memo.service';
import { HolidayService } from './holiday/holiday.service';
import { Type } from '../kalendar/type';
import { Contact } from './contact/contact';
import { Memo } from './memo/memo';
import { PublicHoliday } from './holiday/public-holiday';
import { Day } from '../kalendar/day/day';
import { DayItem } from '../kalendar/day-item';

@Injectable()
export class CoreService {

    constructor(
        public contactService: ContactService,
        public memoService: MemoService,
        public holidayService: HolidayService
    ) { }

    populateDays(days: Day[]) {
        this.populateContactsWithDays(days);
        this.populateMemosWithDays(days);
        this.populatePublicHolidaysWithDays(days);
    }

    private populateContactsWithDays(days: Day[]) {
        this.contactService.getRef().on('child_added', data => {
            const entity: Contact = data.val();
            const date: Date = new Date(entity.birthdate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    // console.log('child_added contact', entity);
                    d.dayItems.push(new DayItem(Type.CONTACT, data.key, entity.firstname + ' ' + entity.lastname));
                }
            })
        });

        this.contactService.getRef().on('child_changed', data => {
            const entity: Contact = data.val();
            const date: Date = new Date(entity.birthdate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_changed contact', entity);
                            di.item = entity.firstname + ' ' + entity.lastname;
                        }
                    })
                }
            })
        });

        this.contactService.getRef().on('child_removed', data => {
            const entity: Contact = data.val();
            const date: Date = new Date(entity.birthdate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_removed contact', entity);
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });
    }

    private populateMemosWithDays(days: Day[]) {
        this.memoService.getRef().on('child_added', data => {
            const entity: Memo = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_added memo', entity);
                    d.dayItems.push(new DayItem(Type.MEMO, data.key, entity.description));
                }
            })
        });

        this.memoService.getRef().on('child_changed', data => {
            const entity: Memo = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        // console.log('child_changed memo', entity);
                        if (di.key === data.key) {
                            di.item = entity.description;
                        }
                    })
                }
            })
        });

        this.memoService.getRef().on('child_removed', data => {
            const entity: Memo = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_removed memo', entity);
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });
    }

    private populatePublicHolidaysWithDays(days: Day[]) {
        this.holidayService.getRef().on('child_added', data => {
            const entity: PublicHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_added publicHoliday', entity);
                    d.dayInfoItems.push(new DayItem(Type.PUBLIC_HOLIDAY, data.key, entity.description));
                }
            })
        });

        this.holidayService.getRef().on('child_changed', data => {
            const entity: PublicHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayInfoItems.forEach(di => {
                        // console.log('child_changed publicHoliday', entity);
                        if (di.key === data.key) {
                            di.item = entity.description;
                        }
                    })
                }
            })
        });

        this.holidayService.getRef().on('child_removed', data => {
            const entity: PublicHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayInfoItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_removed publicHoliday', entity);
                            d.dayInfoItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });
    }

}
