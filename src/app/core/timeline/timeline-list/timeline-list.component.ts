import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OneTimeline } from '../one-timeline/one-timeline';

@Component({
    selector: 'timeline-list',
    templateUrl: './timeline-list.component.html',
    styleUrls: ['./timeline-list.component.css']
})
export class TimelineListComponent {

    @Input() oneTimelines: Observable<OneTimeline[]>;

}
