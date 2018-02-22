import { Component, Input } from '@angular/core';
import { Objective } from '../objective';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'objective-list',
    templateUrl: './objective-list.component.html',
    styleUrls: ['./objective-list.component.css']
})
export class ObjectiveListComponent {

    @Input() objectives: Observable<Objective[]>;

    public objectiveSelected: Objective;

    showObjective(objective: Objective) {
        this.objectiveSelected = objective;
    }

    addObjective() {
        this.objectiveSelected = new Objective(null);
    }

    close() {
        this.objectiveSelected = undefined;
    }
}
