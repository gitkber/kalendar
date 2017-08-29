import { Component, OnInit } from '@angular/core';
import { PublicHolidayService } from '../../core/holiday/public-holiday/public-holiday.service';
import { PublicHoliday } from '../../core/holiday/public-holiday/public-holiday';
import { Observable } from 'rxjs/Observable';
import { ContactHoliday } from '../../core/holiday/contact-holiday/contact-holiday';
import { ContactHolidayService } from '../../core/holiday/contact-holiday/contact-holiday.service';
import { ContactHolidayAction } from '../../core/holiday/contact-holiday/contact-holiday-action';
import { PublicHolidayAction } from '../../core/holiday/public-holiday/public-holiday-action';

@Component({
    selector: 'holidays-view',
    templateUrl: './holidays-view.component.html',
    styleUrls: ['./holidays-view.component.css']
})
export class HolidaysViewComponent implements OnInit {

    public publicHolidaySelected: PublicHoliday;
    public publicHolidays: Observable<PublicHoliday[]>;

    public contactHolidaySelected: ContactHoliday;
    public contactHolidays: Observable<ContactHoliday[]>;

    constructor(private publicHolidayService: PublicHolidayService, private contactHolidayService: ContactHolidayService) { }

    ngOnInit() {
        this.publicHolidays = this.publicHolidayService.getList();
        this.contactHolidays = this.contactHolidayService.getList();
    }

    showPublicHoliday(event: PublicHoliday) {
        this.publicHolidaySelected = event;
    }

    showContactHoliday(event: ContactHoliday) {
        this.contactHolidaySelected = event;
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
        this.publicHolidayService.doActionOnPublicHoliday(event);
    }

    doActionOnContactHoliday(event: ContactHolidayAction) {
        this.contactHolidayService.doActionOnContactHoliday(event);
    }
}
