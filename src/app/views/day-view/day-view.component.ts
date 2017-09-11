import { Component, OnInit } from '@angular/core';
import { Day } from '../../kalendar/day/day';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { CoreService } from '../../core/core.service';

@Component({
    selector: 'day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {

    public day: Day;
    private subscription: Subscription;

    public contactSelected: boolean;
    public memoSelected: boolean;
    public holidaySelected: boolean;

    constructor(private route: ActivatedRoute, private coreService: CoreService, private appService: AppService) {
        this.subscription = this.appService.date.subscribe(d => {
            this.day = new Day(d, new Date());
            const days: Day[] = [];
            days.push(this.day);
            this.coreService.populateDays(days);
        })
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const selectedDate: Date = new Date(params['date']);
            this.appService.selectDate(selectedDate);
        });
    }

    editContact() {
        this.contactSelected = true;
        this.memoSelected = false;
        this.holidaySelected = false;
    }

    editMemos() {
        this.contactSelected = false;
        this.memoSelected = true;
        this.holidaySelected = false;
    }

    editHolidays() {
        this.contactSelected = false;
        this.memoSelected = false;
        this.holidaySelected = true;
    }
}
