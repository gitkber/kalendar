import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { QueryReference } from 'angularfire2/interfaces';
import { AuthService } from '../../service/auth.service';
import { Action } from '../../action';
import { PublicHoliday, PublicHolidayAction } from './public-holiday';

@Injectable()
export class PublicHolidayService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<PublicHoliday[]>;

    // private publicHolidaysObservable: Observable<PublicHoliday[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/publicHolidays/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
        // this.publicHolidaysObservable = this.firebaseListObservable.map((itemKeys) => {
        //     return itemKeys.map(key => {
        //         // key.items = this.db.list(`/publicHolidays/${key.$key}/items`);
        //         return key;
        //     })
        // });
    }

    getRef(): QueryReference {
        return this.firebaseListObservable.$ref;
    }

    getPublicHoliday(key: string): FirebaseObjectObservable<PublicHoliday> {
        return this.db.object(this.path + key);
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
        if (event.action === Action.INSERT) {
            this.firebaseListObservable.push(event.holiday);
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.holidayKey, event.holiday);
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.holidayKey);
        }
    }

}
