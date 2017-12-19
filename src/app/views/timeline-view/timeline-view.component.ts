import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimelineService } from '../../core/timeline/timeline.service';
import { OneTimeline } from '../../core/timeline/one-timeline/one-timeline';
import { ObjectiveService } from '../../core/objective/objective.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Objective } from '../../core/objective/objective';

@Component({
    selector: 'timeline-view',
    templateUrl: './timeline-view.component.html',
    styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {

    public oneTimelines: Observable<OneTimeline[]>;
    public objectives: FirebaseListObservable<Objective[]>;

    constructor(private timelineService: TimelineService, private objectiveService: ObjectiveService) { }

    ngOnInit(): void {
        // this.timelineService.insertFixtures();
        // this.objectiveService.insertFixtures();
        this.oneTimelines = this.timelineService.mapList();
        this.objectives = this.objectiveService.getList();
    }

}
