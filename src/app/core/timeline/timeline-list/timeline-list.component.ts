import { Component, Input } from '@angular/core';
import { Timeline } from '../timeline';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'timeline-list',
    templateUrl: './timeline-list.component.html',
    styleUrls: ['./timeline-list.component.css']
})
export class TimelineListComponent {

    @Input() timelines: FirebaseListObservable<Timeline[]>;

}
