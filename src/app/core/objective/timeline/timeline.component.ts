import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Spot, SpotAction, Timeline } from './timeline';
import { TimelineService } from '../timeline.service';
import { Action } from '../../action';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnChanges {

    @Input() oiKey: string;
    @Input() objective: string;
    @Input() tag: string;

    @Output() showObjectiveClick: EventEmitter<any> = new EventEmitter();

    public spots: Spot[] = [];

    constructor(private timelineService: TimelineService) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.oiKey.currentValue) {
            console.log('change oiKey');

            this.spots = new Timeline(new Date()).spots;
            // TODO service.getTimeline
        }
    }

    saveStatusSpot(spot: Spot) {
        spot.isDone = true;

        const spotAction: SpotAction = new SpotAction(Action.INSERT, spot);
        spotAction.objectiveItemKey = this.oiKey;
        this.timelineService.doActionOnSpot(spotAction);
    }

    showObjective() {
        this.showObjectiveClick.emit();
    }
}
