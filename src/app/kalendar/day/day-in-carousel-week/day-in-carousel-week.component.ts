import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../day';

@Component({
    selector: 'day-in-carousel-week',
    templateUrl: 'day-in-carousel-week.component.html',
    styleUrls: ['./day-in-carousel-week.component.css']
})
export class DayInCarouselWeekComponent {

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
