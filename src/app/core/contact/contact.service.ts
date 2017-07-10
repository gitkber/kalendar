import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Contact } from "./contact";
import { ContactAction } from "./contact-action";
import { Action } from "../action";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FourDays } from "../../kalendar/four-days/four-days";
import { Month } from "../../kalendar/month/month";
import { DayItem } from "../../kalendar/day-item";

@Injectable()
export class ContactService {

    constructor(public db: AngularFireDatabase) { }

    getList(): FirebaseListObservable<Contact[]> { return null }
    doActionOnContact(event: ContactAction) { }
    setFourDays(fourDays: FourDays) { }
    setMonth(month: Month) { }
}

@Injectable()
export class MockContactService {

    private contactsObservable: FirebaseListObservable<Contact[]>;
    private fourDays: FourDays;
    private month: Month;

    constructor(public db: AngularFireDatabase) {
        //firebase.database().ref("persons").set({birthdate: firebase.database.ServerValue.TIMESTAMP});
        //firebase.database().ref("persons").push( {birthdate: firebase.database.ServerValue.TIMESTAMP});
        this.contactsObservable = this.db.list('/persons', {
            query: {
                limitToLast: 50
            }
        });
        this.subscribe();
    }

    subscribe() {
        this.contactsObservable.forEach(items => {
            console.log("contactsObservable subscribe", items);
            console.log(this.fourDays);

            items.forEach(contact => {
                
                //console.log("contact", contact);
                //console.log("contact", contact.birthdate instanceof Date);
                contact.birthdate = new Date(contact.birthdate);
                if (this.fourDays !== undefined) {
                    this.fourDays.days.forEach(day => {
                        if (contact.birthdate.getDate() === day.date.getDate()
                            && contact.birthdate.getMonth() === day.date.getMonth()
                            && contact.birthdate.getFullYear() <= day.date.getFullYear()) {
                            day.dayItems.push(new DayItem(contact.firstname));
                        }
                    })

                }
                if (this.month !== undefined){
                    this.month.days.forEach(day => {
                        if (contact.birthdate.getDate() === day.date.getDate()
                            && contact.birthdate.getMonth() === day.date.getMonth()
                            && contact.birthdate.getFullYear() <= day.date.getFullYear()) {
                            day.dayItems.push(new DayItem(contact.firstname));
                        }
                    })

                }
            })
        });

    }

    getList(): FirebaseListObservable<Contact[]> { return this.contactsObservable }

    doActionOnContact(event: ContactAction) {
        //this.personObservable.push(person).then(resp => console.log("insert person - key : ", resp.key));

        if (event.action === Action.INSERT) {
            this.contactsObservable.push(event.contact).child("birthdate").set(event.contact.birthdate.toJSON("yyyy-MM-dd"));
        } else if (event.action === Action.UPDATE) {
            this.contactsObservable.update(event.contactKey, event.contact);
        } else if (event.action === Action.DELETE) {
            this.contactsObservable.remove(event.contactKey);
        }
    }

    setFourDays(fourDays: FourDays) {
        this.fourDays = fourDays;
    }

    setMonth(month: Month) {
        this.month = month;
    }

}