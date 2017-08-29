import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicHoliday } from '../public-holiday';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'public-holiday-list',
    templateUrl: './public-holiday-list.component.html',
    styleUrls: ['./public-holiday-list.component.css']
})
export class PublicHolidayListComponent {

    @Input() publicHolidays: Observable<PublicHoliday[]>;
    @Output() showHolidayClick: EventEmitter<PublicHoliday> = new EventEmitter();

    showPublicHoliday(holiday) {
        this.showHolidayClick.emit(holiday);
    }

}
