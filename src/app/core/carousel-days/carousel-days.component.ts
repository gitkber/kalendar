import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation } from '../../kalendar/navigation';
import { CarouselDays } from './carousel-days';
import { DayItem } from '../../kalendar/day-item';

@Component({
    selector: 'carousel-days',
    templateUrl: './carousel-days.component.html',
    styleUrls: ['./carousel-days.component.css']
})
export class CarouselDaysComponent {

    @Input() carouselDays: CarouselDays;
    @Input() navigation: string; // year - month - day
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }

    navigateToday() {
        const navigation: Navigation = new Navigation('day');
        navigation.isDay = true;
        navigation.toDate = new Date();
        this.navigate(navigation);
    }

    navigateNextDay() {
        const navigation: Navigation = new Navigation('day');
        navigation.isDay = true;
        navigation.toDate = new Date(this.carouselDays.dateSelected.getFullYear(), this.carouselDays.dateSelected.getMonth(), this.carouselDays.dateSelected.getDate() + 1, 12, 0, 0);
        this.navigate(navigation);
    }

    navigateNextWeek() {
        const navigation: Navigation = new Navigation('day');
        navigation.isNext = true;
        this.navigate(navigation);
    }

    navigatePreviousDay() {
        const navigation: Navigation = new Navigation('day');
        navigation.isDay = true;
        navigation.toDate = new Date(this.carouselDays.dateSelected.getFullYear(), this.carouselDays.dateSelected.getMonth(), this.carouselDays.dateSelected.getDate() - 1, 12, 0, 0);
        this.navigate(navigation);
    }

    navigatePreviousWeek() {
        const navigation: Navigation = new Navigation('day');
        navigation.isPrevious = true;
        this.navigate(navigation);
    }
}
