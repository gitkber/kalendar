import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicHoliday, PublicHolidayItem } from '../public-holiday';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'public-holiday-list',
    templateUrl: './public-holiday-list.component.html',
    styleUrls: ['./public-holiday-list.component.css']
})
export class PublicHolidayListComponent {

    @Input() holidays: Observable<PublicHoliday[]>;
    @Output() showHolidayClick: EventEmitter<PublicHoliday> = new EventEmitter();
    @Output() showHolidayItemClick: EventEmitter<PublicHolidayItem> = new EventEmitter();
    @Output() addHolidayItemClick: EventEmitter<PublicHoliday> = new EventEmitter();

    showHoliday(holiday) {
        this.showHolidayClick.emit(holiday);
    }

    showHolidayItem(item: PublicHolidayItem) {
        this.showHolidayItemClick.emit(item);
    }

    addHolidayItem(holiday: PublicHoliday) {
        this.addHolidayItemClick.emit(holiday)
    }

}
