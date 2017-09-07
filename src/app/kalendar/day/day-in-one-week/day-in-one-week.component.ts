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

    firstCharToUpperCase(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    showModal() {
        this.showDayDetailClick.emit(this.day);
    }
}
