import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Line } from './line/line';
import { Day } from '../kalendar/day/day';
import { DayItem } from '../kalendar/day-item';
import { Type } from '../kalendar/type';
import { ContactService } from './contact/contact.service';
import { LineService } from './line/line.service';
import { Contact } from './contact/contact';

@Injectable()
export class CoreService {

    constructor(public contactService: ContactService, public lineService: LineService) { }

    populateDays(days: Day[]) {
        this.populateContactsWithDays(days);
        this.populateLinesWithDays(days);
    }

    private populateContactsWithDays(days: Day[]) {
        this.contactService.getRef().on('child_added', data => {
            const contact: Contact = data.val();
            const date: Date = new Date(contact.birthdate);
            console.log('child_added contact', contact);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    d.dayItems.push(new DayItem(Type.CONTACT, data.key, contact.firstname + ' ' + contact.lastname));
                }
            })
        });

        this.contactService.getRef().on('child_changed', data => {
            const contact: Contact = data.val();
            const date: Date = new Date(contact.birthdate);
            console.log('child_changed contact', contact);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            di.item = contact.firstname + ' ' + contact.lastname;
                        }
                    })
                }
            })
        });

        this.contactService.getRef().on('child_removed', data => {
            const contact: Contact = data.val();
            const date: Date = new Date(contact.birthdate);
            console.log('child_removed contact', contact);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });
    }

    private populateLinesWithDays(days: Day[]) {
        this.lineService.getRef().on('child_added', data => {
            const line: Line = data.val();
            const date: Date = new Date(line.kalendarDate);
            console.log('child_added line', line);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()) {
                    d.dayItems.push(new DayItem(Type.LINE, data.key, line.description));
                }
            })
        });

        this.lineService.getRef().on('child_changed', data => {
            const line: Line = data.val();
            const date: Date = new Date(line.kalendarDate);
            console.log('child_changed line', line);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            di.item = line.description;
                        }
                    })
                }
            })
        });

        this.lineService.getRef().on('child_removed', data => {
            const line: Line = data.val();
            const date: Date = new Date(line.kalendarDate);
            console.log('child_removed line', line);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });

    }
}
