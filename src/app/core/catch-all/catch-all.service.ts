import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { Action } from '../action';
import { AuthService } from '../service/auth.service';
import { CatchAll, CatchAllAction } from './catch-all';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CatchAllService {

    private firebaseListObservable: FirebaseListObservable<CatchAll[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.firebaseListObservable = this.db.list('/catchall', {
            // preserveSnapshot: true,
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId,
            },
        })
    }

    getCatchAll(): Observable<CatchAll[]> {
        return this.firebaseListObservable;
    }

    getCatchProject(): Observable<CatchAll[]> {
        return this.firebaseListObservable.map(items => items.filter(item => item.tagCaseType === 'PROJECT'));
    }

    getCatchAllAdministration(): Observable<CatchAll[]> {
        return this.firebaseListObservable.map(items => items.filter(item => item.tagCaseType === 'ADMINISTRATION'));
    }

    getCatchAllToDo(): Observable<CatchAll[]> {
        return this.firebaseListObservable.map(items => items.filter(item => item.tagCaseType === 'TODO'));
    }

    getCatchAllHealth(): Observable<CatchAll[]> {
        return this.firebaseListObservable.map(items => items.filter(item => item.tagCaseType === 'HEALTH'));
    }

    doActionOnTodo(event: CatchAllAction) {
        if (event.action === Action.INSERT) {
            event.catchAll.user = this.authService.currentUserId;
            this.firebaseListObservable.push(event.catchAll);
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.key, event.catchAll);
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.key);
        }
    }

}
