import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ObjectiveService } from '../../core/objective/objective.service';
import { Objective } from '../../core/objective/objective';

@Component({
    selector: 'objective-view',
    templateUrl: './objective-view.component.html',
    styleUrls: ['./objective-view.component.css']
})
export class ObjectiveViewComponent implements OnInit {

    public objectives: Observable<Objective[]>;

    constructor(private objectiveService: ObjectiveService) { }

    ngOnInit(): void {
        this.objectives = this.objectiveService.getObservable();
    }

}
