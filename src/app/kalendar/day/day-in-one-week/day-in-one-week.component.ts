import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../day';

@Component({
    selector: 'day-in-one-week',
    templateUrl: 'day-in-one-week.component.html',
    styleUrls: ['./day-in-one-week.component.css']
})
export class DayInOneWeekComponent {

    @Input() day: Day;
    @Output() navigateToMonthClick: EventEmitter<Date> = new EventEmitter();
    @Output() navigateToYearClick: EventEmitter<Date> = new EventEmitter();
    @Output() showDayDetailClick: EventEmitter<Day> = new EventEmitter();

    constructor() { }

    navigateToMonth() {
        this.navigateToMonthClick.emit(this.day.date);
    }

    navigateToYear() {
        this.navigateToYearClick.emit(this.day.date);
    }

    showModal() {
        this.showDayDetailClick.emit(this.day);
    }
}
