import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactHoliday } from '../contact-holiday';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'contact-holiday-list',
    templateUrl: './contact-holiday-list.component.html',
    styleUrls: ['./contact-holiday-list.component.css']
})
export class ContactHolidayListComponent {

    @Input() contactHolidays: Observable<ContactHoliday[]>;
    @Output() showHolidayClick: EventEmitter<ContactHoliday> = new EventEmitter();

    showPublicHoliday(holiday) {
        this.showHolidayClick.emit(holiday);
    }

}
