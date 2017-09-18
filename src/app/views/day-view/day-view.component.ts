import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../app.service';
import { Navigation } from '../../kalendar/navigation';
import { Day } from '../../kalendar/day/day';
import { MemoCriteria } from '../../core/memo/memo-criteria';
import { CoreService } from '../../core/core.service';
import { DateUtilService } from '../../core/service/date-util.service';

@Component({
    selector: 'day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit, OnDestroy {

    public day: Day;
    private subscription: Subscription;

    public memoCriteriaSelected: MemoCriteria;

    public contactSelected: boolean;
    public memoSelected: boolean;
    public holidaySelected: boolean;

    constructor(
        private route: ActivatedRoute,
        private appService: AppService,
        private coreService: CoreService,
        private dateUtilService: DateUtilService
    ) {

        this.memoSelected = true;
        this.subscription = this.appService.date.subscribe(d => {
            this.day = new Day(d, new Date());
            this.memoCriteriaSelected = new MemoCriteria(null, this.dateUtilService.toString(this.day.date), null);
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

    ngOnDestroy(): void {
        // unsubscribe to ensure no memory leaks
        console.log('DayViewComponent ngOnDestroy', this.appService.currentDate);
        this.subscription.unsubscribe();
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

    doActionOnMemo(event: MemoCriteria) {
        this.coreService.memoService.doActionOnMemo(event);
    }

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }
}
