import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../service/auth.service';
import { Action } from '../../action';
import { ContactHoliday, ContactHolidayAction } from './contact-holiday';

@Injectable()
export class ContactHolidayService {

    private firebaseListObservable: FirebaseListObservable<ContactHoliday[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.firebaseListObservable = this.db.list('/contactHolidays', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
        // this.contactHolidaysObservable = this.firebaseListObservable.map((itemKeys) => {
        //     return itemKeys.map(key => {
        //         // key.items = this.db.list(`/contactHolidays/${key.$key}/items`);
        //         return key;
        //     })
        // });
        // this.testObservable = this.firebaseListObservable.map((items) => {
        //     return items.map(item => {
        //         return new TestContactHoliday(item.$key, item['description'], '');
        //
        //     })
        // })
    }

    // getList(): Observable<ContactHoliday[]> { return this.contactHolidaysObservable }

    getRef(): any {
        return this.firebaseListObservable.$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    getContactHoliday(key: string): FirebaseObjectObservable<ContactHoliday> {
        return this.db.object('/contactHolidays/' + key);
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
