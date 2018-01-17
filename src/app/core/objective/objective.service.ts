import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { AuthService } from '../service/auth.service';
import { Objective, Todo, TodoType } from './objective';

@Injectable()
export class ObjectiveService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Objective[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/objectives/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
    }

    getList(): FirebaseListObservable<Objective[]> { return this.firebaseListObservable; }

    insertObjective(objective: Objective) {
        this.firebaseListObservable.push(objective);
    }

    insertTodo(objective: Objective, todo: Todo) {
        this.db.list(this.path + objective['$key'] + 'todos').push(todo);
    }

    insertFixtures() {
        let objective: Objective = new Objective('Rangement', 'WELL_TO_BE / HOME');
        objective.todos.push(new Todo(TodoType.OBJ_BY_DAY, 'rangement en surface 10 min par jour'));
        objective.todos.push(new Todo(TodoType.OBJ_ONE_DAY, 'trier jouets'));
        objective.todos.push(new Todo(TodoType.OBJ_ONE_DAY, 'trier/ranger dans les armoires'));
        this.firebaseListObservable.push(objective);

        objective = new Objective('Papiers', 'WELL_TO_BE / HOME / ADMINISTRATION');
        objective.todos.push(new Todo(TodoType.OBJ_BY_DAY, 'trier papiers 15 min par jour'));
        objective.todos.push(new Todo(TodoType.OBJ_BY_WEEK, 'relever courriers'));
        this.firebaseListObservable.push(objective);

        objective = new Objective('Faire du sport', 'WELL_TO_BE / HEALTH');
        objective.todos.push(new Todo(TodoType.OBJ_ONE_DAY, 'trouver un sport'));
        objective.todos.push(new Todo(TodoType.OBJ_BY_MONTH, 'natation'));
        objective.todos.push(new Todo(TodoType.OBJ_BY_MONTH, 'marche / course'));
        this.firebaseListObservable.push(objective);
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
