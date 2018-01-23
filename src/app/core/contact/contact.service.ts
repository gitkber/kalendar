import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { Contact, ContactAction } from './contact';
import { Action } from '../action';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Contact[]>;
    private postItContactsObservable: FirebaseListObservable<Contact[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/contacts/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
        const subject = new BehaviorSubject<number>(4);
        this.postItContactsObservable = this.db.list(this.path, {
            query: {
                limitToFirst: subject
            }
        });
    }

    getList(): FirebaseListObservable<Contact[]> { return this.firebaseListObservable }

    getRef(): any {
        return this.firebaseListObservable.$ref;
    }

    doActionOnContact(event: ContactAction) {
        if (event.action === Action.INSERT) {
            this.firebaseListObservable.push(new Contact(
                event.contact.firstname, event.contact.lastname, event.contact.birthdate));
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.contactKey, new Contact(
                event.contact.firstname, event.contact.lastname, event.contact.birthdate));
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.contactKey);
        }
    }

    getContactForPostId(): FirebaseListObservable<Contact[]> {
        return this.postItContactsObservable;
    }

    getContact(key: string): FirebaseObjectObservable<Contact> {
        return this.db.object(this.path + key);
    }
}
