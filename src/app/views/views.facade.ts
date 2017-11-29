import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { ContactService } from '../core/contact/contact.service';
import { MemoService } from '../core/memo/memo.service';
import { PublicHolidayService } from '../core/holiday/public-holiday/public-holiday.service';
import { ContactHolidayService } from '../core/holiday/contact-holiday/contact-holiday.service';
import { CatchAllService } from '../core/catch-all/catch-all.service';
import { Contact } from '../core/contact/contact';
import { Memo } from '../core/memo/memo';
import { PublicHoliday } from '../core/holiday/public-holiday/public-holiday';
import { ContactHoliday } from '../core/holiday/contact-holiday/contact-holiday';
import { Type } from '../kalendar/type';
import { Day } from '../kalendar/day/day';
import { DayItem } from '../kalendar/day-item';
import { MontthInCarouselBudget } from '../core/catch-all/carousel-budget/month-in-carousel-budget/montth-in-carousel-budget';
import { CatchBudget } from '../core/catch-all/catch-all';

@Injectable()
export class ViewsFacade {

    constructor(
        public contactService: ContactService,
        public memoService: MemoService,
        public publicHolidayService: PublicHolidayService,
        public contactHolidayService: ContactHolidayService,
        public catchAllService: CatchAllService,
    ) { }

    populateDays(days: Day[]) {
        this.populateContactsWithDays(days);
        this.populateMemosWithDays(days);
        this.populatePublicHolidaysWithDays(days);
        this.populateContactHolidaysWithDays(days);
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
                    d.dayItems.push(new DayItem(Type.CONTACT, data.key, entity.birthdate, entity.firstname, entity.lastname));
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
                            di.principalItem = entity.firstname;
                            di.additionalItem = entity.lastname;
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
                    d.dayItems.push(new DayItem(Type.MEMO, data.key, entity.kalendarDate, entity.description));
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
                            di.principalItem = entity.description;
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
        this.publicHolidayService.getRef().on('child_added', data => {
            const entity: PublicHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_added publicHoliday', entity);
                    d.dayPublicHolidayItem = new DayItem(Type.PUBLIC_HOLIDAY, data.key, entity.date, entity.description);
                }
            })
        });

        this.publicHolidayService.getRef().on('child_changed', data => {
            const entity: PublicHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayPublicHolidayItem.principalItem = entity.description;
                }
            })
        });

        this.publicHolidayService.getRef().on('child_removed', data => {
            const entity: PublicHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayPublicHolidayItem = null;
                }
            })
        });
    }

    private populateContactHolidaysWithDays(days: Day[]) {
        this.contactHolidayService.getRef().on('child_added', data => {
            const entity: ContactHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_added contactHoliday', entity);
                    d.dayContactHolidayItems.push(new DayItem(Type.CONTACT_HOLIDAY, data.key, entity.date, entity.description));
                }
            })
        });

        this.contactHolidayService.getRef().on('child_changed', data => {
            const entity: ContactHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayContactHolidayItems.forEach(di => {
                        // console.log('child_changed contactHoliday', entity);
                        if (di.key === data.key) {
                            di.principalItem = entity.description;
                        }
                    })
                }
            })
        });

        this.contactHolidayService.getRef().on('child_removed', data => {
            const entity: ContactHoliday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayContactHolidayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_removed contactHoliday', entity);
                            d.dayContactHolidayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });
    }

    populateMonths(months: MontthInCarouselBudget[]) {
        this.catchAllService.getBudgetMinRef().on('child_added', data => {
            const entity: CatchBudget = data.val();
            const date: Date = new Date(entity.kalendarDate);
            months.forEach(m => {
                if (date.getTime() <= m.lastDate.getTime()
                    && date.getTime() >= m.firstDate.getTime()) {
                    // console.log('child_added catchAllService', entity);
                    m.catchBudgets.push(entity);
                }
            })
        });
    }

}
