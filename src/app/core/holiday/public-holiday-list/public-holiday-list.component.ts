import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { PublicHoliday, PublicHolidayItem } from '../public-holiday';

@Component({
    selector: 'public-holiday-list',
    templateUrl: './public-holiday-list.component.html',
    styleUrls: ['./public-holiday-list.component.css']
})
export class PublicHolidayListComponent {

    @Input() holidays: FirebaseListObservable<PublicHoliday[]>;
    @Output() showHolidayClick: EventEmitter<PublicHoliday> = new EventEmitter();
    @Output() showHolidayItemClick: EventEmitter<PublicHolidayItem> = new EventEmitter();
    @Output() addHolidayItemClick: EventEmitter<PublicHoliday> = new EventEmitter();

    showHoliday(holiday: PublicHoliday) {
        this.showHolidayClick.emit(holiday);
    }

    showHolidayItem(item: PublicHolidayItem) {
        this.showHolidayItemClick.emit(item);
    }

    addHolidayItem(holiday: PublicHoliday) {
        holiday.items.push(new PublicHolidayItem('tesz', '2001-01-01'));
        this.holidays.push(holiday);
        // this.addHolidayItemClick.emit(holiday)
    }
}
