import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation } from '../../navigation';
import { CarouselWeek } from './carousel-week';
import { DayItem } from '../../day-item';

@Component({
    selector: 'carousel-week',
    templateUrl: './carousel-week.component.html',
    styleUrls: ['./carousel-week.component.css']
})
export class CarouselWeekComponent {

    @Input() carouselWeek: CarouselWeek;
    @Input() navigation: string; // year - month - day
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
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

    showDayItem(event: DayItem) {
        this.showDayItemClick.emit(event);
    }

}
