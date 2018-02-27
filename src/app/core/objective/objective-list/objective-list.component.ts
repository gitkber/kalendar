import { Component, Input, OnInit } from '@angular/core';
import { Objective } from '../objective';
import { Observable } from 'rxjs/Observable';
import { ObjectiveService } from '../objective.service';

@Component({
    selector: 'objective-list',
    templateUrl: './objective-list.component.html',
    styleUrls: ['./objective-list.component.css']
})
export class ObjectiveListComponent implements OnInit {

    public objectives: Observable<Objective[]>;
    public objectiveSelected: Objective;

    constructor(private objectiveService: ObjectiveService) { }

    ngOnInit(): void {
        this.objectives = this.objectiveService.getObservable();
    }

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
