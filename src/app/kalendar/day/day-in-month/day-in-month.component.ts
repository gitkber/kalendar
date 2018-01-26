import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day } from '../day';
import { DayItem } from '../../day-item';

@Component({
    selector: 'day-in-month',
    templateUrl: 'day-in-month.component.html',
    styleUrls: ['./day-in-month.component.css']
})
export class DayInMonthComponent implements OnInit {

    @Input() day: Day;
    @Output() showDayClick: EventEmitter<Day> = new EventEmitter();
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    showDay() {
        this.showDayClick.emit(this.day);
    }

    showDayItem(dayItem: DayItem) {
        this.showDayItemClick.emit(dayItem);
    }
}
