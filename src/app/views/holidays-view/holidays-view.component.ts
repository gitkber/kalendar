import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../core/holiday/holiday.service';
import { PublicHoliday, PublicHolidayItem } from '../../core/holiday/public-holiday';
import { PublicHolidayAction } from '../../core/holiday/public-holiday-action';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'holidays-view',
    templateUrl: './holidays-view.component.html',
    styleUrls: ['./holidays-view.component.css']
})
export class HolidaysViewComponent implements OnInit {

    public publicHolidaySelected: PublicHoliday;
    public publicHolidayItemSelected: PublicHolidayItem;

    public publicHolidays: Observable<PublicHoliday[]>;

    constructor(private holidayService: HolidayService) { }

    ngOnInit() {
        this.publicHolidays = this.holidayService.getList();
    }

    showPublicHoliday(event: PublicHoliday) {
        console.log('showPublicHoliday event', event);
        this.publicHolidaySelected = event;
    }

    showHolidayItem(event: PublicHolidayItem) {
        console.log('showHolidayItem event', event);
        this.publicHolidayItemSelected = event;
    }

    addHolidayItem(event: PublicHoliday) {
        console.log('addHolidayItem event', event);
        this.publicHolidaySelected = event;
        this.publicHolidayItemSelected = new PublicHolidayItem(null, null);
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
        console.log('doActionOnPublicHoliday event', event);
        this.holidayService.doActionOnPublicHoliday(event);
    }
}
