import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Week } from '../week';
import { Day } from '../../day/day';
import { Navigation } from '../../navigation';

@Component({
    selector: 'one-week',
    templateUrl: './one-week.component.html',
    styleUrls: ['./one-week.component.css']
})
export class OneWeekComponent {

    @Input() week: Week;
    @Input() navigation: string; // year - month - day
    @Output() showDayDetailClick: EventEmitter<Day> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

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

    goToday() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isToday = true;
        this.navigateClick.emit(navigation);
    }

    goNext() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isNext = true;
        this.navigateClick.emit(navigation);
    }

    goPrevious() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isPrevious = true;
        this.navigateClick.emit(navigation);
    }

    showDayDetail(day: Day) {
        this.showDayDetailClick.emit(day);
    }

}
