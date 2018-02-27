import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthService } from '../service/auth.service';
import { Action } from '../action';
import { Spot, SpotAction, Timeline } from './timeline/timeline';

@Injectable()
export class TimelineService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Timeline[]>;
    private observable: Observable<Timeline[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/timelines/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
        this.observable = this.db.list(this.path);
    }

    getSpotObservable(oiKey: string): Observable<Spot[]> {
        return this.db.list(this.path + oiKey);
    }

    doActionOnSpot(event: SpotAction) {
        const pathIem: string = this.path + event.objectiveItemKey + '/';

        if (event.action === Action.INSERT) {
            console.log(pathIem);
            this.db.list(pathIem).push(event.spot.date);
        } else if (event.action === Action.UPDATE) {
            // console.log('event.key', event.objectiveItemKey);
            // this.db.list(pathIem).update(event.key, new ObjectiveItem(event.objectiveItem.tagType, event.objectiveItem.description));
        } else if (event.action === Action.DELETE) {
            // this.db.list(pathIem).remove(event.key);
        }
    }

}
