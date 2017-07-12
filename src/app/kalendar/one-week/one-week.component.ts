import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OneWeek } from './one-week';

@Component({
    selector: 'one-week',
    templateUrl: './one-week.component.html',
    styleUrls: ['./one-week.component.css']
})
export class OneWeekComponent {

    @Input() oneWeek: OneWeek;
    @Output() navigateToMonthClick: EventEmitter<Date> = new EventEmitter();
    @Output() navigateToYearClick: EventEmitter<Date> = new EventEmitter();

    navigateToMonth(event: Date) {
        this.navigateToMonthClick.emit(event);
    }

    navigateToYear(event: Date) {
        this.navigateToYearClick.emit(event);
    }

}
