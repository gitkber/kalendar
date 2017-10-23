import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../../day/day';
import { Navigation } from '../../navigation';
import { CarouselWeek } from './carousel-week';

@Component({
    selector: 'carousel-week',
    templateUrl: './carousel-week.component.html',
    styleUrls: ['./carousel-week.component.css']
})
export class CarouselWeekComponent {

    @Input() carouselWeek: CarouselWeek;
    @Input() navigation: string; // year - month - day
    @Output() showDayDetailClick: EventEmitter<Day> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    navigateToMonth(event: Date) {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isMonth = true;
        navigation.toDate = event;
        this.navigateClick.emit(navigation);
    }

    navigateToYear(event: Date) {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isYear = true;
        navigation.toDate = event;
        this.navigateClick.emit(navigation);
    }

    prevWeek() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isPrevious = true;
        this.navigateClick.emit(navigation);
    }

    goToday() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isToday = true;
        this.navigateClick.emit(navigation);
    }

    nextWeek() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isNext = true;
        this.navigateClick.emit(navigation);
    }

    showDayDetail(day: Day) {
        if (day.isSelected) {
            this.showDayDetailClick.emit(day);
        } else {
            const navigation: Navigation = new Navigation('day');
            navigation.toDate = day.date;
            this.navigateClick.emit(navigation);
        }
    }

}
