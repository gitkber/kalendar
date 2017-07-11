import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Line } from './line';
import { LineAction } from './line-action';
import { Action } from '../action';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FourDays } from '../../kalendar/four-days/four-days';
import { Month } from '../../kalendar/month/month';
import { Day } from '../../kalendar/day/day';
import { DayItem } from '../../kalendar/day-item';

@Injectable()
export class LineService {

    constructor(public db: AngularFireDatabase) { }

    getList(): FirebaseListObservable<Line[]> { return null }

    doActionOnLine(event: LineAction) { }

    populateFourDays(fourDays: FourDays) { }

    populateDayInFourDays(day: Day) { }

    populateMonth(month: Month) { }
}

@Injectable()
export class MockLineService {

    private linesObservable: FirebaseListObservable<Line[]>;

    constructor(public db: AngularFireDatabase) {
        // firebase.database().ref("persons").set({birthdate: firebase.database.ServerValue.TIMESTAMP});
        // firebase.database().ref("persons").push( {birthdate: firebase.database.ServerValue.TIMESTAMP});
        this.linesObservable = this.db.list('/lines', {
            query: {
                limitToLast: 50
            }
        });

    }

    getList(): FirebaseListObservable<Line[]> { return this.linesObservable }

    doActionOnLine(event: LineAction) {
        // this.personObservable.push(person).then(resp => console.log("insert person - key : ", resp.key));

        if (event.action === Action.INSERT) {
            this.linesObservable.push(event.line).child('kalendarDate').set(event.line.kalendarDate.toJSON('yyyy-MM-dd'));
        } else if (event.action === Action.UPDATE) {
            this.linesObservable.update(event.lineKey, event.line);
        } else if (event.action === Action.DELETE) {
            this.linesObservable.remove(event.lineKey);
        }
    }

    populateFourDays(fourDays: FourDays) {
        this.linesObservable.subscribe(items => {
            console.log('linesObservable subscribe fourDays', items);
            items.forEach(line => {
                line.kalendarDate = new Date(line.kalendarDate);
                fourDays.days.forEach(day => {
                    this.pushLineInDay(day, line);
                })
            })
        });
    }

    populateDayInFourDays(day: Day) {
        this.linesObservable.subscribe(items => {
            console.log('linesObservable subscribe day in fourDays', items);
            items.forEach(line => {
                line.kalendarDate = new Date(line.kalendarDate);
                this.pushLineInDay(day, line);
            })
        });
    }

    populateMonth(month: Month) {
        this.linesObservable.subscribe(items => {
            console.log('linesObservable subscribe month', items);
            items.forEach(line => {
                line.kalendarDate = new Date(line.kalendarDate);
                month.days.forEach(day => {
                    this.pushLineInDay(day, line);
                })
            })
        });
    }

    private pushLineInDay(day: Day, line: Line) {
        if (line.kalendarDate.getDate() === day.date.getDate()
            && line.kalendarDate.getMonth() === day.date.getMonth()
            && line.kalendarDate.getFullYear() <= day.date.getFullYear()) {
            day.dayItems.push(new DayItem(line.description));
        }
    }

}
