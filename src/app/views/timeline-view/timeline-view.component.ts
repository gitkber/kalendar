import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../../core/timeline/timeline.service';
import { Timeline } from '../../core/timeline/timeline';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'timeline-view',
    templateUrl: './timeline-view.component.html',
    styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {

    public timelines: FirebaseListObservable<Timeline[]>;

    constructor(private timelineService: TimelineService) { }

    ngOnInit(): void {
        this.timelines = this.timelineService.getList();
    }

}
