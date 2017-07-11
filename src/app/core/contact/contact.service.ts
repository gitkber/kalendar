import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Contact } from './contact';
import { ContactAction } from './contact-action';
import { Action } from '../action';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FourDays } from '../../kalendar/four-days/four-days';
import { Month } from '../../kalendar/month/month';
import { Day } from '../../kalendar/day/day';
import { DayItem } from '../../kalendar/day-item';

@Injectable()
export class ContactService {

    constructor(public db: AngularFireDatabase) { }

    getList(): FirebaseListObservable<Contact[]> { return null }

    doActionOnContact(event: ContactAction) { }

    populateFourDays(fourDays: FourDays) { }

    populateDayInFourDays(day: Day) { }

    populateMonth(month: Month) { }
}

@Injectable()
export class MockContactService {

    private contactsObservable: FirebaseListObservable<Contact[]>;

    constructor(public db: AngularFireDatabase) {
        // firebase.database().ref("persons").set({birthdate: firebase.database.ServerValue.TIMESTAMP});
        // firebase.database().ref("persons").push( {birthdate: firebase.database.ServerValue.TIMESTAMP});
        this.contactsObservable = this.db.list('/persons', {
            query: {
                limitToLast: 50
            }
        });

    }

    getList(): FirebaseListObservable<Contact[]> { return this.contactsObservable }

    doActionOnContact(event: ContactAction) {
        // this.personObservable.push(person).then(resp => console.log("insert person - key : ", resp.key));

        if (event.action === Action.INSERT) {
            this.contactsObservable.push(event.contact).child('birthdate').set(event.contact.birthdate.toJSON('yyyy-MM-dd'));
        } else if (event.action === Action.UPDATE) {
            this.contactsObservable.update(event.contactKey, event.contact);
        } else if (event.action === Action.DELETE) {
            this.contactsObservable.remove(event.contactKey);
        }
    }

    populateFourDays(fourDays: FourDays) {
        this.contactsObservable.subscribe(items => {
            console.log('contactsObservable subscribe fourDays', items);
            items.forEach(contact => {
                contact.birthdate = new Date(contact.birthdate);
                fourDays.days.forEach(day => {
                    this.pushContactInDay(day, contact);
                })
            })
        });
    }

    populateDayInFourDays(day: Day) {
        this.contactsObservable.subscribe(items => {
            console.log('contactsObservable subscribe day in fourDays', items);
            items.forEach(contact => {
                contact.birthdate = new Date(contact.birthdate);
                this.pushContactInDay(day, contact);
            })
        });
    }

    populateMonth(month: Month) {
        this.contactsObservable.subscribe(items => {
            console.log('contactsObservable subscribe month', items);
            items.forEach(contact => {
                contact.birthdate = new Date(contact.birthdate);
                month.days.forEach(day => {
                    this.pushContactInDay(day, contact);
                })
            })
        });
    }

    private pushContactInDay(day: Day, contact: Contact) {
        if (contact.birthdate.getDate() === day.date.getDate()
            && contact.birthdate.getMonth() === day.date.getMonth()
            && contact.birthdate.getFullYear() <= day.date.getFullYear()) {
            day.dayItems.push(new DayItem(contact.firstname + ' ' + contact.lastname));
        }
    }

}
