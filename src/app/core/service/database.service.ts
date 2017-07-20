import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { Contact } from '../contact/contact';

@Injectable()
export class DatabaseService {

    public contactsObservable: FirebaseListObservable<Contact[]>;

    constructor(
        public db: AngularFireDatabase, public authService: AuthService
    ) {
    }

    loadList() {
        console.log('user' + this.authService.currentUserId);
        // firebase.database().ref("persons").set({birthdate: firebase.database.ServerValue.TIMESTAMP});
        // firebase.database().ref("persons").push( {birthdate: firebase.database.ServerValue.TIMESTAMP});
        this.contactsObservable = this.db.list('/persons', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
    }

}
