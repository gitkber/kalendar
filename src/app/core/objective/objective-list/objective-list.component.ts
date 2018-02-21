import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Objective, ObjectiveItem } from '../objective';

@Component({
    selector: 'objective-list',
    templateUrl: './objective-list.component.html',
    styleUrls: ['./objective-list.component.css']
})
export class ObjectiveListComponent implements OnChanges {

    @Input() objectives: FirebaseListObservable<Objective[]>;
    @Output() showItemClick: EventEmitter<Objective> = new EventEmitter();

    public objectiveSelected: Objective;
    public objectiveItemSelected: ObjectiveItem;
    public objectiveKeySelected: string;

    constructor() {
        //
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.objectives.currentValue) {
           console.log('log', this.objectives.forEach(t => t.forEach(i => console.log(i))));
        }
    }


    showObjective(objective: Objective) {
        // this.showItemClick.emit(contact);
        this.objectiveSelected = objective;
    }

    showObjectiveItem(objective: Objective, objectiveItem: ObjectiveItem) {
        // this.showItemClick.emit(contact);
        this.objectiveItemSelected = objectiveItem;
        this.objectiveKeySelected = objective['$key'];
    }

    addObjective() {
        // this.showItemClick.emit(new Objective(null));
        this.objectiveSelected = new Objective(null);
    }

    addObjectiveItem(objective: Objective) {
        // this.showItemClick.emit(new Objective(null));
        this.objectiveItemSelected = new ObjectiveItem(null, null);
        this.objectiveKeySelected = objective['$key'];
    }

    close() {
        this.objectiveSelected = undefined;
        this.objectiveItemSelected = undefined;
    }
}
