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
    public directory: string;

    constructor() {
        this.directory = 'todo';
    }

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

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }

    showDayDetail(day: Day) {
        this.showDayDetailClick.emit(day);
    }

}
