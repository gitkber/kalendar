import { Component, OnInit } from '@angular/core';
import { ObjectiveService } from '../../core/objective/objective.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Objective } from '../../core/objective/objective';

@Component({
    selector: 'objective-view',
    templateUrl: './objective-view.component.html',
    styleUrls: ['./objective-view.component.css']
})
export class ObjectiveViewComponent implements OnInit {

    public objectives: FirebaseListObservable<Objective[]>;

    constructor(private objectiveService: ObjectiveService) { }

    ngOnInit(): void {
        // this.objectiveService.insertFixtures();
        this.objectives = this.objectiveService.getList();
    }

}
