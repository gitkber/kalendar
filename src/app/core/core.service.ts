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
        this.contactService.getList().subscribe(items => {
            console.log('contactsObservable subscribe days', items);
            items.forEach(contact => {
                contact.birthdate = new Date(contact.birthdate);
                days.forEach(d => {
                    this.pushContactInDay(d, contact);
                })

            })
        });
        this.lineService.getList().subscribe(items => {
            console.log('linesObservable subscribe days', items);
            items.forEach(line => {
                line.kalendarDate = new Date(line.kalendarDate);
                days.forEach(d => {
                    this.pushLineInDay(d, line);
                })
            })
        });
    }

    private pushLineInDay(day: Day, line: Line) {
        if (line.kalendarDate.getDate() === day.date.getDate()
            && line.kalendarDate.getMonth() === day.date.getMonth()
            && line.kalendarDate.getFullYear() <= day.date.getFullYear()) {
            let found: boolean;
            day.dayItems.forEach(di => {
                if (di.key === line['$key']) {
                    found = true;
                }
            })
            if (!found) {
                day.dayItems.push(new DayItem(Type.LINE, line['$key'], line.description));
            }
        }
    }

    private pushContactInDay(day: Day, contact: Contact) {
        if (contact.birthdate.getDate() === day.date.getDate()
            && contact.birthdate.getMonth() === day.date.getMonth()
            && contact.birthdate.getFullYear() <= day.date.getFullYear()) {
            day.dayItems.push(new DayItem(Type.CONTACT, contact['$key'], contact.firstname + ' ' + contact.lastname));
        }
    }

}
