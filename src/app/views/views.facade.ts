import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { ContactService } from '../core/contact/contact.service';
import { EventService } from '../core/event/event.service';
import { Contact } from '../core/contact/contact';
import { Event } from '../core/event/event';
import { Type } from '../kalendar/type';
import { Day } from '../kalendar/day/day';
import { DayItem } from '../kalendar/day-item';
import { MonthInCarouselBudget } from '../core/budget/carousel-budget/month-in-carousel-budget/month-in-carousel-budget';
import { BudgetService } from '../core/budget/budget.service';
import { Budget } from '../core/budget/budget';
import { HolidayService } from '../core/holiday/holiday.service';
import { Holiday } from '../core/holiday/holiday';
import { TagHolidayType } from '../common/utils/tag';

@Injectable()
export class ViewsFacade {

    constructor(
        public contactService: ContactService,
        public eventService: EventService,
        public holidayService: HolidayService,
        public budgetService: BudgetService
    ) { }

    populateDays(days: Day[]) {
        this.populateContactsWithDays(days);
        this.populateEventsWithDays(days);
        this.populateHolidaysWithDays(days);
        this.populateBudgetWithDays(days);
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

    private populateEventsWithDays(days: Day[]) {
        this.eventService.getRef().on('child_added', data => {
            const entity: Event = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_added event', entity);
                    d.dayItems.push(new DayItem(Type.EVENT, data.key, entity.kalendarDate, entity.description));
                }
            })
        });

        this.eventService.getRef().on('child_changed', data => {
            const entity: Event = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        // console.log('child_changed event', entity);
                        if (di.key === data.key) {
                            di.principalItem = entity.description;
                        }
                    })
                }
            })
        });

        this.eventService.getRef().on('child_removed', data => {
            const entity: Event = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_removed event', entity);
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });
    }

    private populateHolidaysWithDays(days: Day[]) {
        this.holidayService.getRef().on('child_added', data => {
            const entity: Holiday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_added holiday', entity);
                    if (entity.tagType === TagHolidayType.PUBLIC) {
                        d.dayPublicHolidayItem = new DayItem(Type.PUBLIC_HOLIDAY, data.key, entity.date, entity.description);
                    } else if (entity.tagType === TagHolidayType.CONTACT) {
                        d.dayContactHolidayItems.push(new DayItem(Type.CONTACT_HOLIDAY, data.key, entity.date, entity.description));
                    } else if (entity.tagType === TagHolidayType.SCHOOL) {
                        // TODO
                    }
                }
            })
        });

        this.holidayService.getRef().on('child_changed', data => {
            const entity: Holiday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_changed holiday', entity);
                    if (entity.tagType === TagHolidayType.PUBLIC) {
                        d.dayPublicHolidayItem.principalItem = entity.description;
                    } else if (entity.tagType === TagHolidayType.CONTACT) {
                        d.dayContactHolidayItems.forEach(di => {
                            if (di.key === data.key) {
                                di.principalItem = entity.description;
                            }
                        })
                    } else if (entity.tagType === TagHolidayType.SCHOOL) {
                        // TODO
                    }
                }
            })
        });

        this.holidayService.getRef().on('child_removed', data => {
            const entity: Holiday = data.val();
            const date: Date = new Date(entity.date);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_removed holiday', entity);
                    if (entity.tagType === TagHolidayType.PUBLIC) {
                        d.dayPublicHolidayItem = null;
                    } else if (entity.tagType === TagHolidayType.CONTACT) {
                        d.dayContactHolidayItems.forEach(di => {
                            if (di.key === data.key) {
                                d.dayContactHolidayItems.splice(d.dayContactHolidayItems.indexOf(di), 1);
                            }
                        })
                    } else if (entity.tagType === TagHolidayType.SCHOOL) {
                        // TODO
                    }
                }
            })
        });
    }

    private populateBudgetWithDays(days: Day[]) {
        this.budgetService.getMinRef().on('child_added', data => {
            const entity: Budget = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    // console.log('child_added publicHoliday', entity);
                    d.dayItems.push(new DayItem(Type.BUDGET, data.key, entity.kalendarDate, entity.description));
                }
            })
        });

        this.budgetService.getMinRef().on('child_changed', data => {
            const entity: Budget = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_changed contact', entity);
                            di.principalItem = entity.description;
                            di.additionalItem = entity.tagType;
                        }
                    })
                }
            })
        });

        this.budgetService.getMinRef().on('child_removed', data => {
            const entity: Budget = data.val();
            const date: Date = new Date(entity.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() === d.date.getFullYear()) {
                    d.dayContactHolidayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_removed contactHoliday', entity);
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });
    }

    populateMonths(months: MonthInCarouselBudget[]) {
        this.budgetService.getMinRef().on('child_added', data => {
            const entity: Budget = data.val();
            const date: Date = new Date(entity.kalendarDate);
            months.forEach(m => {
                if (date.getTime() <= m.lastDate.getTime()
                    && date.getTime() >= m.firstDate.getTime()) {
                    // console.log('child_added budgetService', entity);
                    m.budgets.push(entity);
                }
            })
        });
    }

}
