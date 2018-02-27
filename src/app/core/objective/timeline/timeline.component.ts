import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObjectiveItem } from '../objective';
import { Spot, Timeline } from './timeline';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {

    @Input() objective: string;
    @Input() tag: string;

    @Output() showObjectiveClick: EventEmitter<any> = new EventEmitter();

    public spots: Spot[] = [];

    constructor() {
        this.spots = new Timeline(new Date()).spots;
    }

    showObjective() {
        this.showObjectiveClick.emit();
    }
}
