import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { QueryReference } from 'angularfire2/interfaces';
import { AuthService } from '../../service/auth.service';
import { Action } from '../../action';
import { ContactHoliday, ContactHolidayAction } from './contact-holiday';

@Injectable()
export class ContactHolidayService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<ContactHoliday[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/contactHolidays/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
    }

    getRef(): QueryReference {
        return this.firebaseListObservable.$ref;
    }

    getContactHoliday(key: string): FirebaseObjectObservable<ContactHoliday> {
        return this.db.object(this.path + key);
    }

    doActionOnContactHoliday(event: ContactHolidayAction) {
        if (event.action === Action.INSERT) {
            this.firebaseListObservable.push(event.holiday);
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.holidayKey, event.holiday);
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.holidayKey);
        }
    }

}
