import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { QueryReference } from 'angularfire2/interfaces';
import { AuthService } from '../service/auth.service';
import { DateUtilService } from '../service/date-util.service';
import { Action } from '../action';
import { Line } from './line';
import { LineCriteria } from './line-criteria';

@Injectable()
export class LineService {

    private linesObservable: FirebaseListObservable<Line[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService, public dateUtilService: DateUtilService) {
        this.linesObservable = this.db.list('/lines', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
    }

    getList(): FirebaseListObservable<Line[]> { return this.linesObservable }

    getRef(): QueryReference {
        return this.linesObservable.$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    doActionOnLine(event: LineCriteria) {
        if (event.action === Action.INSERT) {
            console.log('insert');
            this.linesObservable.push(new Line(this.authService.currentUserId, event.description, event.kalendarDate));
            let dayDate: Date = new Date(event.kalendarDate);
            for (let i = 1; i <= event.duplication; i++) {
                dayDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 1);
                if (!event.includeWeekend) {
                    if (dayDate.getDay() === 6) {
                        dayDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 2);
                    } else if (dayDate.getDay() === 0) {
                        dayDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 1);
                    }
                }
                this.linesObservable.push(new Line(this.authService.currentUserId, event.description, this.dateUtilService.toString(dayDate)));
            }
        } else if (event.action === Action.UPDATE) {
            console.log('update');
            this.linesObservable.update(event.lineKey, new Line(this.authService.currentUserId, event.description, event.kalendarDate));
        } else if (event.action === Action.DELETE) {
            console.log('delete');
            this.linesObservable.remove(event.lineKey);
        }
    }

}
