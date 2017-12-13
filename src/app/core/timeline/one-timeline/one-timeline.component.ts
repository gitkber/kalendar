import { Component, Input } from '@angular/core';
import { Timeline } from '../timeline';

@Component({
    selector: 'one-timeline',
    templateUrl: './one-timeline.component.html',
    styleUrls: ['./one-timeline.component.css']
})
export class OneTimelineComponent {

    @Input() timeline: Timeline;

}
