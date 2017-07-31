import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Memo } from './memo/memo';
import { Day } from '../kalendar/day/day';
import { DayItem } from '../kalendar/day-item';
import { Type } from '../kalendar/type';
import { ContactService } from './contact/contact.service';
import { MemoService } from './memo/memo.service';
import { Contact } from './contact/contact';

@Injectable()
export class CoreService {

    constructor(public contactService: ContactService, public memoService: MemoService) { }

    populateDays(days: Day[]) {
        this.populateContactsWithDays(days);
        this.populateMemosWithDays(days);
    }

    private populateContactsWithDays(days: Day[]) {
        this.contactService.getRef().on('child_added', data => {
            const contact: Contact = data.val();
            const date: Date = new Date(contact.birthdate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    // console.log('child_added contact', contact);
                    d.dayItems.push(new DayItem(Type.CONTACT, data.key, contact.firstname + ' ' + contact.lastname));
                }
            })
        });

        this.contactService.getRef().on('child_changed', data => {
            const contact: Contact = data.val();
            const date: Date = new Date(contact.birthdate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_changed contact', contact);
                            di.item = contact.firstname + ' ' + contact.lastname;
                        }
                    })
                }
            })
        });

        this.contactService.getRef().on('child_removed', data => {
            const contact: Contact = data.val();
            const date: Date = new Date(contact.birthdate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()
                    && date.getFullYear() <= d.date.getFullYear()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_removed contact', contact);
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });
    }

    private populateMemosWithDays(days: Day[]) {
        this.memoService.getRef().on('child_added', data => {
            const memo: Memo = data.val();
            const date: Date = new Date(memo.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()) {
                    // console.log('child_added memo', memo);
                    d.dayItems.push(new DayItem(Type.MEMO, data.key, memo.description));
                }
            })
        });

        this.memoService.getRef().on('child_changed', data => {
            const memo: Memo = data.val();
            const date: Date = new Date(memo.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()) {
                    d.dayItems.forEach(di => {
                        // console.log('child_changed memo', memo);
                        if (di.key === data.key) {
                            di.item = memo.description;
                        }
                    })
                }
            })
        });

        this.memoService.getRef().on('child_removed', data => {
            const memo: Memo = data.val();
            const date: Date = new Date(memo.kalendarDate);
            days.forEach(d => {
                if (date.getDate() === d.date.getDate()
                    && date.getMonth() === d.date.getMonth()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            // console.log('child_removed memo', memo);
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });

    }
}
