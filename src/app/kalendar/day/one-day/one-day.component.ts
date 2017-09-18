import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../day';
import { Navigation } from '../../navigation';
import { DayItem } from '../../day-item';

@Component({
    selector: 'one-day',
    templateUrl: 'one-day.component.html',
    styleUrls: ['./one-day.component.css']
})
export class OneDayComponent {

    @Input() day: Day;
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }

    showDayItem(event: DayItem) {
        this.showDayItemClick.emit(event);
    }
}
