import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { AuthService } from '../service/auth.service';
import { Objective, Occurence, Timeline } from './timeline';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimelineService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Timeline[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/timeline/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path, {
            // preserveSnapshot: true,
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId,
            },
        })
    }

    getList(): FirebaseListObservable<Timeline[]> { return this.firebaseListObservable; }

    // mapList(): Observable<any> {
    //     return this.firebaseListObservable.map(items => items.reduce((accumulator, currentValue) => {
    //         return accumulator;
    //     }, []));
    // }

    insertOccurence() {
        this.db.list(this.path + '0/objectives/0/occurences').push(new Occurence('2017-02-01', 'DONE'));
    }

    insertObjective() {
        this.db.list(this.path + '0/objectives').push(new Objective('OBJ_BY_DAY', 'test', 'NOT_STARTED'));
    }

    insertFixtures() {
        const timeline: Timeline = new Timeline('Rangement', 'WELL_TO_BE / HOME', 'IN_PROGRESS');
        timeline.objectives.push(new Objective('OBJ_BY_DAY', 'rangement en surface 10 min par jour', 'IN_PROGRESS'));
        timeline.objectives[0].occurences.push(new Occurence('2017-01-01', 'DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-01-02', 'DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-01-04', 'DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-01-05', 'NOT_DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-01-06', 'NOT_DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-01-10', 'NOT_DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-01-15', 'DONE'));
        timeline.objectives.push(new Objective('OBJ_ONE_DAY', 'trier jouets', 'NOT_STARTED'));
        timeline.objectives[1].occurences.push(new Occurence('2017-01-01', 'DONE'));
        timeline.objectives[1].occurences.push(new Occurence('2017-01-03', 'DONE'));
        timeline.objectives[1].occurences.push(new Occurence('2017-01-05', 'DONE'));
        timeline.objectives[1].occurences.push(new Occurence('2017-01-05', 'NOT_DONE'));
        timeline.objectives[1].occurences.push(new Occurence('2017-01-06', 'NOT_DONE'));

        this.firebaseListObservable.push(timeline);

    }

}
