import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ViewsFacade } from '../views.facade';
import { AppService } from '../../app.service';
import { Month } from '../../kalendar/month/month';
import { Day } from '../../kalendar/day/day';
import { Navigation } from '../../kalendar/navigation';
import { RouterService } from '../../core/service/router.service';
import { DayItem } from '../../kalendar/day-item';

@Component({
    selector: 'month-view',
    templateUrl: './month-view.component.html',
    styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit, OnDestroy {

    public month: Month;
    private selectedDay: Day;
    private subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private viewsFacade: ViewsFacade,
        private appService: AppService,
        private routerService: RouterService
    ) {
        this.subscription = this.appService.date.subscribe(d => {
            this.month = new Month(d.getMonth() + 1, d.getFullYear());
            this.selectedDay = this.month.selectDate(this.appService.currentDate);
            this.viewsFacade.populateDays(this.month.days);
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
        console.log('KalMonthViewComponent ngOnDestroy', this.appService.currentDate);
        this.subscription.unsubscribe();
    }

    showDayDetail(event: Day) {
        this.appService.selectDate(event.date);
        if (event.isDisabled) {
            this.month.jump(event.date.getMonth() + 1, event.date.getFullYear());
            this.selectedDay = this.month.selectDate(event.date);
        } else {
            this.selectedDay = this.month.selectDate(this.appService.currentDate);
            this.routerService.navigateToHome();
        }
    }

    showDayItemDetail(event: DayItem) {
        // TODO
        console.log('TODO', event);
    }

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }
}
