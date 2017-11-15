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

    getCatchAllProject(): Observable<CatchAll[]> {
        return this.getCatchAllByTagCaseType('PROJECT');
    }

    getCatchAllAdministration(): Observable<CatchAll[]> {
        return this.getCatchAllByTagCaseType('ADMINISTRATION');
    }

    getCatchAllFamily(): Observable<CatchAll[]> {
        return this.getCatchAllByTagCaseType('FAMILY');
    }

    getCatchAllHealth(): Observable<CatchAll[]> {
        return this.getCatchAllByTagCaseType('HEALTH');
    }

    getCatchAllByTagCaseType(tagCaseType): Observable<CatchAll[]> {
        return this.firebaseListObservable.map(items => items.filter(item => item.tagCaseType === tagCaseType));
    }

    doActionOnCatchAll(event: CatchAllAction) {
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
