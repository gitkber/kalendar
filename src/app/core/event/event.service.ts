import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { QueryReference } from 'angularfire2/interfaces';
import { AuthService } from '../service/auth.service';
import { DateUtilService } from '../../common/utils/date-util.service';
import { Action } from '../action';
import { Event, EventAction } from './event';

@Injectable()
export class EventService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Event[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService, public dateUtilService: DateUtilService) {
        this.path = '/events/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
    }

    getRef(): QueryReference {
        return this.firebaseListObservable.$ref;
    }

    doActionOnEvent(event: EventAction) {
        if (event.action === Action.INSERT) {
            for (let i = 0; i < event.datesToAdd.length; i++) {
                this.firebaseListObservable.push(new Event(event.event.description,
                    this.dateUtilService.toString(event.datesToAdd[i])));
            }
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.eventKey, new Event(event.event.description, event.event.kalendarDate));
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.eventKey);
        }
    }

}
