import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OneWeek } from './one-week';
import { Day } from '../day/day';

@Component({
    selector: 'one-week',
    templateUrl: './one-week.component.html',
    styleUrls: ['./one-week.component.css']
})
export class OneWeekComponent {

    @Input() oneWeek: OneWeek;
    @Output() navigateToMonthClick: EventEmitter<Date> = new EventEmitter();
    @Output() navigateToYearClick: EventEmitter<Date> = new EventEmitter();
    @Input() navigation: string; // year - month - day
    @Output() nextClick: EventEmitter<any> = new EventEmitter();
    @Output() previousClick: EventEmitter<any> = new EventEmitter();
    @Output() showDayDetailClick: EventEmitter<Day> = new EventEmitter();

    navigateToMonth(event: Date) {
        this.navigateToMonthClick.emit(event);
    }

    navigateToYear(event: Date) {
        this.navigateToYearClick.emit(event);
    }

    goNext() {
        this.nextClick.emit(this.navigation);
    }

    goPrevious() {
        this.previousClick.emit(this.navigation);
    }

    showDayDetail(day: Day) {
        this.showDayDetailClick.emit(day);
    }

}
