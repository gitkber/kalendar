import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../day';
import { Navigation } from '../../navigation';

@Component({
    selector: 'day-in-carousel-week',
    templateUrl: 'day-in-carousel-week.component.html',
    styleUrls: ['./day-in-carousel-week.component.css']
})
export class DayInCarouselWeekComponent {

    @Input() day: Day;
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();
    @Output() showDayDetailClick: EventEmitter<Day> = new EventEmitter();

    constructor() { }

    navigateToMonth() {
        const navigation: Navigation = new Navigation('day');
        navigation.isMonth = true;
        navigation.toDate = this.day.date;
        this.navigateClick.emit(navigation);
    }

    navigateToDay() {
        const navigation: Navigation = new Navigation('day');
        navigation.isDay = true;
        navigation.toDate = this.day.date;
        this.navigateClick.emit(navigation);
    }

    firstCharToUpperCase(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    showDayDetail() {
        this.showDayDetailClick.emit(this.day);
    }
}
