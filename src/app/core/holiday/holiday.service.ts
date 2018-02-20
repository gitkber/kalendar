import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { QueryReference } from 'angularfire2/interfaces';
import { AuthService } from '../service/auth.service';
import { Action } from '../action';
import { Holiday, HolidayAction } from './holiday';
import { TagHolidayType } from '../../common/utils/tag';

@Injectable()
export class HolidayService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Holiday[]>;

    // private publicHolidaysObservable: Observable<PublicHoliday[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/holidays/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
        // this.publicHolidaysObservable = this.firebaseListObservable.map((itemKeys) => {
        //     return itemKeys.map(key => {
        //         // key.items = this.db.list(`/publicHolidays/${key.$key}/items`);
        //         return key;
        //     })
        // });
    }

    findPublicHolidays(): Observable<Holiday[]> {
        return this.firebaseListObservable.map(items => items.filter(item => item.tagType === TagHolidayType.PUBLIC));
    }

    getRef(): QueryReference {
        return this.firebaseListObservable.$ref;
    }

    getHoliday(key: string): FirebaseObjectObservable<Holiday> {
        return this.db.object(this.path + key);
    }

    doActionOnHoliday(event: HolidayAction) {
        if (event.action === Action.INSERT) {
            this.firebaseListObservable.push(event.holiday);
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.key, event.holiday);
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.key);
        }
    }

}
