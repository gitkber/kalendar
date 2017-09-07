import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../day';

@Component({
    selector: 'one-day',
    templateUrl: 'one-day.component.html',
    styleUrls: ['./one-day.component.css']
})
export class OneDayComponent {

    @Input() day: Day;
    @Output() navigateToMonthClick: EventEmitter<Date> = new EventEmitter();
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
