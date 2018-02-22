import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthService } from '../service/auth.service';
import { Objective, ObjectiveAction, ObjectiveItem, ObjectiveItemAction } from './objective';
import { Action } from '../action';

@Injectable()
export class ObjectiveService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Objective[]>;
    private observable: Observable<Objective[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/objectives/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
        this.observable = this.db.list(this.path).map(value => {
            value.forEach(v => {
                if (v.items) {
                    v.items = Object.keys(v.items).map(key => {
                        v.items[key]['$key'] = key;
                        return v.items[key];
                    });
                }
                return v;
            });
            return value;
        });
    }

    getObservable(): Observable<Objective[]> {
        return this.observable;
    }

    doActionOnObjective(event: ObjectiveAction) {
        if (event.action === Action.INSERT) {
            this.firebaseListObservable.push(event.objective);
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.key, event.objective);
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.key);
        }
    }

    doActionOnObjectiveItem(event: ObjectiveItemAction) {
        const pathIem: string = this.path + event.objectiveKey + '/items/';
        if (event.action === Action.INSERT) {
            this.db.list(pathIem).push(event.objectiveItem);
        } else if (event.action === Action.UPDATE) {
            console.log('event.key', event.key);
            this.db.list(pathIem).update(event.key, new ObjectiveItem(event.objectiveItem.tagType, event.objectiveItem.description));
        } else if (event.action === Action.DELETE) {
            this.db.list(pathIem).remove(event.key);
        }
    }

    insertFixtures() {
        // let objective: Objective = new Objective('Rangement');
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.DAILY, 'rangement en surface 10 min par jour'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'trier jouets'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'trier/ranger dans les armoires'));
        // this.firebaseListObservable.push(objective);
        //
        // objective = new Objective('Administration');
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.DAILY, 'trier papiers 15 min par jour'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.WEEKLY, 'relever courriers'));
        // this.firebaseListObservable.push(objective);
        //
        // objective = new Objective('Sportif');
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'trouver un sport'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.MONTHLY, 'natation'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.MONTHLY, 'marche / course'));
        // this.firebaseListObservable.push(objective);
        //
        // objective = new Objective('Projet dévelopement');
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'ContactListView - add contact'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.MONTHLY, 'Deploy prod'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'Analyse Objectives'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'Analyse Timeline'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'Review Holiday - vac scolaire'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'Help - with tooltip'));
        // objective.items.push(new ObjectiveItem(TagObjectiveItemType.ONCE, 'More one css'));
        // this.firebaseListObservable.push(objective);
    }

    // insertOLDFixtures() {
    //     const timeline: Timeline = new Timeline('Faire du sport', 'WELL_TO_BE / HEALTH', 'IN_PROGRESS');
    //     timeline.objectives.push(new Objective('OBJ_ONE_DAY', 'trouver le sport', 'IN_PROGRESS'));
    //     timeline.objectives[0].occurences.push(new Occurence('2017-12-01', 'DONE'));
    //     timeline.objectives[0].occurences.push(new Occurence('2017-12-02', 'DONE'));
    //     timeline.objectives[0].occurences.push(new Occurence('2017-12-04', 'DONE'));
    //     timeline.objectives[0].occurences.push(new Occurence('2017-12-05', 'NOT_DONE'));
    //     timeline.objectives[0].occurences.push(new Occurence('2017-12-06', 'NOT_DONE'));
    //     timeline.objectives[0].occurences.push(new Occurence('2017-12-10', 'NOT_DONE'));
    //     timeline.objectives[0].occurences.push(new Occurence('2017-12-15', 'DONE'));
    //     timeline.objectives.push(new Objective('OBJ_ONE_DAY', 'natation', 'NOT_STARTED'));
    //     timeline.objectives[1].occurences.push(new Occurence('2017-12-01', 'DONE'));
    //     timeline.objectives[1].occurences.push(new Occurence('2017-12-03', 'DONE'));
    //     timeline.objectives[1].occurences.push(new Occurence('2017-12-05', 'DONE'));
    //     timeline.objectives[1].occurences.push(new Occurence('2017-12-05', 'NOT_DONE'));
    //     timeline.objectives[1].occurences.push(new Occurence('2017-12-06', 'NOT_DONE'));
    //     timeline.objectives.push(new Objective('OBJ_ONE_DAY', 'marche / course', 'NOT_STARTED'));
    //     timeline.objectives[2].occurences.push(new Occurence('2017-12-12', 'DONE'));
    //
    //     this.firebaseListObservable.push(timeline);
    //     // this.firebaseListObservable.push(new Timeline('Papiers', 'WELL_TO_BE / HOME', 'NOT_STARTED'));
    // }

}
