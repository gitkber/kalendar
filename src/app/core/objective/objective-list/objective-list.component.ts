import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective, ObjectiveItem } from '../objective';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'objective-list',
    templateUrl: './objective-list.component.html',
    styleUrls: ['./objective-list.component.css']
})
export class ObjectiveListComponent {

    @Input() objectives: Observable<Objective[]>;
    @Output() showItemClick: EventEmitter<Objective> = new EventEmitter();

    public objectiveSelected: Objective;
    public objectiveItemSelected: ObjectiveItem;
    public objectiveKeySelected: string;

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
