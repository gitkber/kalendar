import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { QueryReference } from 'angularfire2/interfaces';
import { AuthService } from '../service/auth.service';
import { DateUtilService } from '../service/date-util.service';
import { Action } from '../action';
import { Memo, MemoAction } from './memo';

@Injectable()
export class MemoService {

    private memosObservable: FirebaseListObservable<Memo[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService, public dateUtilService: DateUtilService) {
        this.memosObservable = this.db.list('/memos', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
    }

    getList(): FirebaseListObservable<Memo[]> { return this.memosObservable }

    getRef(): QueryReference {
        return this.memosObservable.$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    doActionOnMemo(event: MemoAction) {
        if (event.action === Action.INSERT) {
            for (let i = 0; i < event.datesToAdd.length; i++) {
                this.memosObservable.push(new Memo(this.authService.currentUserId, event.memo.description,
                    this.dateUtilService.toString(event.datesToAdd[i])));
            }
        } else if (event.action === Action.UPDATE) {
            this.memosObservable.update(event.memoKey, new Memo(this.authService.currentUserId, event.memo.description, event.memo.kalendarDate));
        } else if (event.action === Action.DELETE) {
            this.memosObservable.remove(event.memoKey);
        }
    }

}
