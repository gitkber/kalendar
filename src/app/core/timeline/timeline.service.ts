import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthService } from '../service/auth.service';
import { Action } from '../action';
import { Spot, SpotAction, Timeline } from './timeline';
import { DateUtilService } from '../../common/utils/date-util.service';

@Injectable()
export class TimelineService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Timeline[]>;
    private observable: Observable<Timeline[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService, private dateUtilService: DateUtilService) {
        this.path = '/timelines/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
        this.observable = this.db.list(this.path);
    }

    getSpotObservable(oiKey: string): Spot[] {
        const timeline: Timeline = new Timeline(new Date());

        const pathIem: string = this.path + oiKey + '/';
        console.log(pathIem);
        this.db.list(pathIem).map(items => {
            items.map(item => {
                timeline.spots.forEach(s => {
                    const date: Date = new Date(item['$value']);
                    if (date.getDate() === s.date.getDate()
                        && date.getMonth() === s.date.getMonth()
                        && date.getFullYear() === s.date.getFullYear()) {
                        s.isDone = true;
                    }
                })
            })
        }).subscribe();
        return timeline.spots;
    }

    doActionOnSpot(event: SpotAction) {
        const pathIem: string = this.path + event.objectiveItemKey + '/';

        if (event.action === Action.INSERT) {
            console.log(pathIem);
            this.db.list(pathIem).push(this.dateUtilService.toString(event.spot.date));
        } else if (event.action === Action.UPDATE) {
            // console.log('event.key', event.objectiveItemKey);
            // this.db.list(pathIem).update(event.key, new ObjectiveItem(event.objectiveItem.tagType, event.objectiveItem.description));
        } else if (event.action === Action.DELETE) {
            // this.db.list(pathIem).remove(event.key);
        }
    }

}
