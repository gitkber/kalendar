import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Line } from './line';
import { LineAction } from './line-action';
import { Action } from '../action';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class LineService {

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

}
