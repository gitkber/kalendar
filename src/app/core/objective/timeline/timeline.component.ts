import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObjectiveItem } from '../objective';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {

    @Input() objective: string;
    @Input() tag: string;

    @Output() showObjectiveClick: EventEmitter<any> = new EventEmitter();

    constructor() { }

    showObjective() {
        this.showObjectiveClick.emit();
    }
}
