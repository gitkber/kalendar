import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Contact } from './contact';
import { ContactAction } from './contact-action';
import { Action } from '../action';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ContactService {

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

}
