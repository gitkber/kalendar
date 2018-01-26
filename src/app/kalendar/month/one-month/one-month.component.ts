import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Month } from '../month';
import { Day } from '../../day/day';
import { Navigation } from '../../navigation';
import { DayItem } from '../../day-item';

@Component({
    selector: 'one-month',
    templateUrl: './one-month.component.html',
    styleUrls: ['./one-month.component.css']
})
export class OneMonthComponent implements OnInit {

    @Input() month: Month;
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();
    @Output() showDayClick: EventEmitter<Day> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    showDayDetail(event: Day) {
        this.showDayClick.emit(event);
    }

    showDayItemDetail(event: DayItem) {
        this.showDayItemClick.emit(event);
    }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }
}
