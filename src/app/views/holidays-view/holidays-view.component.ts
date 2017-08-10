import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../core/holiday/holiday.service';
import { PublicHoliday } from '../../core/holiday/public-holiday';
import { PublicHolidayAction } from '../../core/holiday/public-holiday-action';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'holidays-view',
    templateUrl: './holidays-view.component.html',
    styleUrls: ['./holidays-view.component.css']
})
export class HolidaysViewComponent implements OnInit {

    public publicHolidaySelected: PublicHoliday;
    public publicHolidays: Observable<PublicHoliday[]>;

    constructor(private holidayService: HolidayService) { }

    ngOnInit() {
        this.publicHolidays = this.holidayService.getList();
    }

    showPublicHoliday(event: PublicHoliday) {
        this.publicHolidaySelected = event;
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
        this.holidayService.doActionOnPublicHoliday(event);
    }
}
