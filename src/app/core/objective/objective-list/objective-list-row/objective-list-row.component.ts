import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective, ObjectiveItem } from '../../objective';

@Component({
    selector: 'objective-list-row',
    templateUrl: './objective-list-row.component.html',
    styleUrls: ['./objective-list-row.component.css']
})
export class ObjectiveListRowComponent {

    @Input() objective: Objective;
    public editMode: boolean;
    @Output() showObjectiveClick: EventEmitter<Objective> = new EventEmitter();

    public objectiveItemSelected: ObjectiveItem;
    public objectiveKeySelected: string;

    constructor() { }

    showObjective() {
        this.editMode = true;
    }

    showObjectiveItem(objectiveItem: ObjectiveItem) {
        this.editMode = true;
        this.objectiveItemSelected = objectiveItem;
        this.objectiveKeySelected = this.objective['$key'];

    }

    addObjectiveItem() {
        this.editMode = true;
        this.objectiveItemSelected = new ObjectiveItem(null, null);
        this.objectiveKeySelected = this.objective['$key'];
    }

    close() {
        this.editMode = false;
    }
}
