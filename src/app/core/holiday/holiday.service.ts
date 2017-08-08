import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Action } from '../action';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../service/auth.service';
import { PublicHoliday } from './public-holiday';
import { PublicHolidayAction } from './public-holiday-action';

@Injectable()
export class HolidayService {

    private publicHolidaysObservable: FirebaseListObservable<PublicHoliday[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        console.log('constructor service');
        this.publicHolidaysObservable = this.db.list('/publicHolidays', { preserveSnapshot: true,
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
        this.db.list('/publicHolidays', { preserveSnapshot: true})
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    console.log(snapshot.key, snapshot.val());
                    if (snapshot.val().items) {
                        Object.keys(snapshot.val().items).forEach(d => {
                            console.log(d, snapshot.val().items[d]);
                        })
                    }
                });
            })
        /*
        this.publicHolidaysObservable.map(test => {
            console.log('test', test)
            test.forEach(d => {
                if (d.items) {
                    console.log('d', Object.keys(d.items));
                    Object.keys(d.items).forEach(key => {
                        console.log('value', d.items[key]);
                    })
                }
            });
            return test;
        }).subscribe();
        */
    }

    getList(): FirebaseListObservable<PublicHoliday[]> { return this.publicHolidaysObservable }

    getRef(): any {
        return this.publicHolidaysObservable.map(test => {
            console.log('test', test)
            return test;
        }); // .$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
        if (event.action === Action.INSERT) {
            event.holiday.user = this.authService.currentUserId;
            this.publicHolidaysObservable.push(event.holiday);
        } else if (event.action === Action.UPDATE) {
            this.publicHolidaysObservable.update(event.holidayKey, event.holiday);
        } else if (event.action === Action.DELETE) {
            this.publicHolidaysObservable.remove(event.holidayKey);
        }
    }

}
