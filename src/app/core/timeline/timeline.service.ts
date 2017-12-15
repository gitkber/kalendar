import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { AuthService } from '../service/auth.service';
import { Objective, Occurence, Timeline } from './timeline';
import { Observable } from 'rxjs/Observable';
import { ObjectiveLine, OneTimeline } from './one-timeline/one-timeline';

@Injectable()
export class TimelineService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Timeline[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/timeline/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
    }

    getList(): FirebaseListObservable<Timeline[]> { return this.firebaseListObservable; }

    mapList(): Observable<OneTimeline[]> {
        return this.firebaseListObservable.map(items => items.reduce((accumulator, currentValue) => {
            const oneTimeline: OneTimeline = new OneTimeline(currentValue.description);
            for (const objective of currentValue.objectives) {
                const objectiveLine: ObjectiveLine = new ObjectiveLine(objective.type, objective.description);
                oneTimeline.objectiveLines.push(objectiveLine);
                for (const occ of objective.occurences) {
                    const date: Date = new Date(occ.kalendarDate);
                    for (const monthLine of objectiveLine.monthLines) {
                        if (date.getFullYear() === monthLine.date.getFullYear() && date.getMonth() === monthLine.date.getMonth()) {
                            const index = monthLine.dayOfLines.findIndex(v => v.day === date.getDate());
                            if (index > -1) {
                                monthLine.dayOfLines[index].status = occ.status;
                            }
                            break;
                        }
                    }
                }
            }
            accumulator.push(oneTimeline);
            return accumulator;
        }, []));
    }

    insertOccurence() {
        this.db.list(this.path + '0/objectives/0/occurences').push(new Occurence('2017-02-01', 'DONE'));
    }

    insertObjective() {
        this.db.list(this.path + '0/objectives').push(new Objective('OBJ_BY_DAY', 'test', 'NOT_STARTED'));
    }

    insertFixtures() {
        const timeline: Timeline = new Timeline('Faire du sport', 'WELL_TO_BE / HEALTH', 'IN_PROGRESS');
        timeline.objectives.push(new Objective('OBJ_ONE_DAY', 'trouver le sport', 'IN_PROGRESS'));
        timeline.objectives[0].occurences.push(new Occurence('2017-12-01', 'DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-12-02', 'DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-12-04', 'DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-12-05', 'NOT_DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-12-06', 'NOT_DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-12-10', 'NOT_DONE'));
        timeline.objectives[0].occurences.push(new Occurence('2017-12-15', 'DONE'));
        timeline.objectives.push(new Objective('OBJ_ONE_DAY', 'natation', 'NOT_STARTED'));
        timeline.objectives[1].occurences.push(new Occurence('2017-12-01', 'DONE'));
        timeline.objectives[1].occurences.push(new Occurence('2017-12-03', 'DONE'));
        timeline.objectives[1].occurences.push(new Occurence('2017-12-05', 'DONE'));
        timeline.objectives[1].occurences.push(new Occurence('2017-12-05', 'NOT_DONE'));
        timeline.objectives[1].occurences.push(new Occurence('2017-12-06', 'NOT_DONE'));
        timeline.objectives.push(new Objective('OBJ_ONE_DAY', 'marche / course', 'NOT_STARTED'));
        timeline.objectives[2].occurences.push(new Occurence('2017-12-12', 'DONE'));

        this.firebaseListObservable.push(timeline);
        // this.firebaseListObservable.push(new Timeline('Papiers', 'WELL_TO_BE / HOME', 'NOT_STARTED'));
    }

}
