import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Spot, SpotAction } from './timeline';
import { TimelineService } from './timeline.service';
import { Action } from '../action';

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
            this.spots = this.timelineService.getSpotObservable(this.oiKey);
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
