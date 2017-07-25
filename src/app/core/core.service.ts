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
        // http://plnkr.co/edit/NCaX3xwE6PNSHyN2Cjn5?p=preview
        // https://stackoverflow.com/questions/41721134/firebase-angularfire2-listening-on-queried-list-child-added
        // https://angular.io/api/core/IterableDiffer
        // http://plnkr.co/edit/JV7xcMhAuupnSdwrd8XB?p=preview
        this.contactService.getList().subscribe(items => {
            console.log('contactsObservable subscribe days', items);
            items.forEach(contact => {
                contact.birthdate = new Date(contact.birthdate);
                days.forEach(d => {
                    this.pushContactInDay(d, contact);
                })

            })
        });

        this.lineService.getRef().on('child_added', data => {
            const line: Line = data.val();
            line.kalendarDate = new Date(line.kalendarDate);
            console.log('child_added line', line);
            days.forEach(d => {
                if (line.kalendarDate.getDate() === d.date.getDate()
                    && line.kalendarDate.getMonth() === d.date.getMonth()) {
                    d.dayItems.push(new DayItem(Type.LINE, data.key, line.description));
                }
            })
        });

        this.lineService.getRef().on('child_changed', data => {
            const line: Line = data.val();
            line.kalendarDate = new Date(line.kalendarDate);
            console.log('child_changed line', line);
            days.forEach(d => {
                if (line.kalendarDate.getDate() === d.date.getDate()
                    && line.kalendarDate.getMonth() === d.date.getMonth()) {
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
            line.kalendarDate = new Date(line.kalendarDate);
            console.log('child_changed line', line);
            days.forEach(d => {
                if (line.kalendarDate.getDate() === d.date.getDate()
                    && line.kalendarDate.getMonth() === d.date.getMonth()) {
                    d.dayItems.forEach(di => {
                        if (di.key === data.key) {
                            d.dayItems.splice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }
            })
        });

    }

    private pushContactInDay(day: Day, contact: Contact) {
        if (contact.birthdate.getDate() === day.date.getDate()
            && contact.birthdate.getMonth() === day.date.getMonth()
            && contact.birthdate.getFullYear() <= day.date.getFullYear()) {
            day.dayItems.push(new DayItem(Type.CONTACT, contact['$key'], contact.firstname + ' ' + contact.lastname));
        }
    }

}
