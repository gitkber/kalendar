import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Line } from './line/line';
import { OneWeek } from '../kalendar/one-week/one-week';
import { Month } from '../kalendar/month/month';
import { Day } from '../kalendar/day/day';
import { DayItem } from '../kalendar/day-item';
import { Type } from '../kalendar/type';
import { ContactService } from './contact/contact.service';
import { LineService } from './line/line.service';
import { Contact } from './contact/contact';

@Injectable()
export class CoreService {

    constructor(public contactService: ContactService, public lineService: LineService) { }

    populateFourDays(fourDays: OneWeek) {
        this.contactService.getList().subscribe(items => {
            console.log('contactsObservable subscribe oneWeek', items);
            items.forEach(contact => {
                contact.birthdate = new Date(contact.birthdate);
                fourDays.days.forEach(day => {
                    this.pushContactInDay(day, contact);
                })
            })
        });
        this.lineService.getList().subscribe(items => {
            console.log('linesObservable subscribe oneWeek', items);
            items.forEach(line => {
                line.kalendarDate = new Date(line.kalendarDate);
                fourDays.days.forEach(day => {
                    this.pushLineInDay(day, line);
                })
            })
        });
    }

    populateDayInFourDays(day: Day) {
        this.contactService.getList().subscribe(items => {
            console.log('contactsObservable subscribe day in oneWeek', items);
            items.forEach(contact => {
                contact.birthdate = new Date(contact.birthdate);
                this.pushContactInDay(day, contact);
            })
        });
        this.lineService.getList().subscribe(items => {
            console.log('linesObservable subscribe day in oneWeek', items);
            items.forEach(line => {
                line.kalendarDate = new Date(line.kalendarDate);
                this.pushLineInDay(day, line);
            })
        });
    }

    populateMonth(month: Month) {
        this.contactService.getList().subscribe(items => {
            console.log('contactsObservable subscribe month', items);
            items.forEach(contact => {
                contact.birthdate = new Date(contact.birthdate);
                month.days.forEach(day => {
                    this.pushContactInDay(day, contact);
                })
            })
        });
        this.lineService.getList().subscribe(items => {
            console.log('linesObservable subscribe month', items);
            items.forEach(line => {
                line.kalendarDate = new Date(line.kalendarDate);
                month.days.forEach(day => {
                    this.pushLineInDay(day, line);
                })
            })
        });
    }

    private pushLineInDay(day: Day, line: Line) {
        if (line.kalendarDate.getDate() === day.date.getDate()
            && line.kalendarDate.getMonth() === day.date.getMonth()
            && line.kalendarDate.getFullYear() <= day.date.getFullYear()) {
            day.dayItems.push(new DayItem(Type.LINE, line.description));
        }
    }

    private pushContactInDay(day: Day, contact: Contact) {
        if (contact.birthdate.getDate() === day.date.getDate()
            && contact.birthdate.getMonth() === day.date.getMonth()
            && contact.birthdate.getFullYear() <= day.date.getFullYear()) {
            day.dayItems.push(new DayItem(Type.CONTACT, contact.firstname + ' ' + contact.lastname));
        }
    }

}
