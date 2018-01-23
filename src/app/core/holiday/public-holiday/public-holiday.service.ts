import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../service/auth.service';
import { Action } from '../../action';
import { PublicHoliday, PublicHolidayAction } from './public-holiday';

@Injectable()
export class PublicHolidayService {

    private firebaseListObservable: FirebaseListObservable<PublicHoliday[]>;
    private publicHolidaysObservable: Observable<PublicHoliday[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.firebaseListObservable = this.db.list('/publicHolidays', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
        this.publicHolidaysObservable = this.firebaseListObservable.map((itemKeys) => {
            return itemKeys.map(key => {
                // key.items = this.db.list(`/publicHolidays/${key.$key}/items`);
                return key;
            })
        });
    }

    // getList(): Observable<PublicHoliday[]> { return this.publicHolidaysObservable }

    getRef(): any {
        return this.firebaseListObservable.$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    getPublicHoliday(key: string): FirebaseObjectObservable<PublicHoliday> {
        return this.db.object('/publicHolidays/' + key);
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
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
