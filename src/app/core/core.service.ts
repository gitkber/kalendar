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
            let line: Line = data.val();
            line.kalendarDate = new Date(line.kalendarDate);
            days.forEach(d => {
                if (line.kalendarDate.getDate() === d.date.getDate()
                    && line.kalendarDate.getMonth() === d.date.getMonth()) {
                    d.dayItems.push(new DayItem(Type.LINE, line['$key'], line.description));
                }
            })
        });
        this.lineService.getRef().on('child_removed', data => {
            console.log('remove element');
            
            let line: Line = data.val();
            line.kalendarDate = new Date(line.kalendarDate);
            days.forEach(d => {

                if (line.kalendarDate.getDate() === d.date.getDate()
                    && line.kalendarDate.getMonth() === d.date.getMonth()) {
                    d.dayItems.forEach(di => {
                        if (di.key === line['$key']) {
                            d.dayItems.slice(d.dayItems.indexOf(di), 1);
                        }
                    })
                }


            })
        });
        /*
        this.lineService.getList().subscribe(items => {
        console.log('days', days);
            console.log('linesObservable subscribe days', items);
            items.forEach(line => {
                line.kalendarDate = new Date(line.kalendarDate);
                days.forEach(d => {
                    this.pushLineInDay(d, line);
                })
            })
        });
        */
    }



    private pushContactInDay(day: Day, contact: Contact) {
        if (contact.birthdate.getDate() === day.date.getDate()
            && contact.birthdate.getMonth() === day.date.getMonth()
            && contact.birthdate.getFullYear() <= day.date.getFullYear()) {
            day.dayItems.push(new DayItem(Type.CONTACT, contact['$key'], contact.firstname + ' ' + contact.lastname));
        }
    }

}
