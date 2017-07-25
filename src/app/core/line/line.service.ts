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
        // firebase.database().ref('lines').set({kalendarDate: firebase.database.ServerValue.TIMESTAMP});
        // firebase.database().ref("persons").push( {birthdate: firebase.database.ServerValue.TIMESTAMP});
        this.linesObservable = this.db.list('/lines', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
    }

    getList(): FirebaseListObservable<Line[]> { return this.linesObservable }

    getRef(): any {
        return this.linesObservable.$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    doActionOnLine(event: LineAction) {
        // this.personObservable.push(person).then(resp => console.log("insert person - key : ", resp.key));
        if (event.action === Action.INSERT) {
            console.log('insert');
            event.line.user = this.authService.currentUserId;
            this.linesObservable.push(event.line);
        } else if (event.action === Action.UPDATE) {
            console.log('update');
            this.linesObservable.update(event.lineKey, event.line);
        } else if (event.action === Action.DELETE) {
            console.log('delete');
            this.linesObservable.remove(event.lineKey);
        }
    }

}
