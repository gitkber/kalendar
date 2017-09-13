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

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }

    showDayDetail(day: Day) {
        this.showDayDetailClick.emit(day);
    }

}
