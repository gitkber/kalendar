import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../service/auth.service';
import { Action } from '../../action';
import { ContactHolidayAction } from './contact-holiday-action';
import { ContactHoliday } from './contact-holiday';

@Injectable()
export class ContactHolidayService {

    private firebaseListObservable: FirebaseListObservable<ContactHoliday[]>;
    private contactHolidaysObservable: Observable<ContactHoliday[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.firebaseListObservable = this.db.list('/contactHolidays', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
        this.contactHolidaysObservable = this.firebaseListObservable.map((itemKeys) => {
            return itemKeys.map(key => {
                // key.items = this.db.list(`/contactHolidays/${key.$key}/items`);
                return key;
            })
        });
    }

    getList(): Observable<ContactHoliday[]> { return this.contactHolidaysObservable }

    getRef(): any {
        return this.firebaseListObservable.$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    doActionOnContactHoliday(event: ContactHolidayAction) {
        if (event.action === Action.INSERT) {
            event.holiday.user = this.authService.currentUserId;
            this.firebaseListObservable.push(event.holiday);
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.holidayKey, event.holiday);
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.holidayKey);
        }
    }

}
