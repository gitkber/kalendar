import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Line } from './line';
import { LineAction } from './line-action';
import { Action } from '../action';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LineService {

    private linesObservable: FirebaseListObservable<Line[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        // firebase.database().ref("persons").set({birthdate: firebase.database.ServerValue.TIMESTAMP});
        // firebase.database().ref("persons").push( {birthdate: firebase.database.ServerValue.TIMESTAMP});
        this.linesObservable = this.db.list('/lines', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
    }

    getList(): FirebaseListObservable<Line[]> { return this.linesObservable }
    getRef():any {
        return this.db.database.ref('/lines');
    }
    doActionOnLine(event: LineAction) {
        // this.personObservable.push(person).then(resp => console.log("insert person - key : ", resp.key));

        if (event.action === Action.INSERT) {
            event.line.user = this.authService.currentUserId;
            this.linesObservable.push(event.line).child('kalendarDate').set(event.line.kalendarDate.toJSON('yyyy-MM-dd'));
        } else if (event.action === Action.UPDATE) {
            this.linesObservable.update(event.lineKey, event.line);
        } else if (event.action === Action.DELETE) {
            this.linesObservable.remove(event.lineKey);
        }
    }

}
