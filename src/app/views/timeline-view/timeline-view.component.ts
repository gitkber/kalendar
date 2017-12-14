import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimelineService } from '../../core/timeline/timeline.service';
import { OneTimeline } from '../../core/timeline/one-timeline/one-timeline';

@Component({
    selector: 'timeline-view',
    templateUrl: './timeline-view.component.html',
    styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {

    public oneTimelines: Observable<OneTimeline[]>;

    constructor(private timelineService: TimelineService) { }

    ngOnInit(): void {
        // this.timelineService.insertFixtures();
        this.oneTimelines = this.timelineService.mapList();
    }

}
