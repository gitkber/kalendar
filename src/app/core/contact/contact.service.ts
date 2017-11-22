import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { Contact, ContactAction } from './contact';
import { Action } from '../action';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {

    private contactsObservable: FirebaseListObservable<Contact[]>;
    private postItContactsObservable: FirebaseListObservable<Contact[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.contactsObservable = this.db.list('/contacts', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
        const subject = new BehaviorSubject<number>(4);
        this.postItContactsObservable = this.db.list('/contacts', {
            query: {
                limitToFirst: subject,
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
    }

    getList(): FirebaseListObservable<Contact[]> { return this.contactsObservable }

    getRef(): any {
        return this.contactsObservable.$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    doActionOnContact(event: ContactAction) {
        if (event.action === Action.INSERT) {
            this.contactsObservable.push(new Contact(this.authService.currentUserId,
                event.contact.firstname, event.contact.lastname, event.contact.birthdate));
        } else if (event.action === Action.UPDATE) {
            this.contactsObservable.update(event.contactKey, new Contact(this.authService.currentUserId,
                event.contact.firstname, event.contact.lastname, event.contact.birthdate));
        } else if (event.action === Action.DELETE) {
            this.contactsObservable.remove(event.contactKey);
        }
    }

    getContactForPostId(): FirebaseListObservable<Contact[]> {
        return this.postItContactsObservable;
    }
}
