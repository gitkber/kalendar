import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../app.service';
import { Year } from '../../kalendar/year/year';
import { Day } from '../../kalendar/day/day';
import { ViewsFacade } from '../views.facade';
import { Navigation } from '../../kalendar/navigation';
import { RouterService } from '../../core/service/router.service';

@Component({
    selector: 'kal-year-view',
    templateUrl: './year-view.component.html',
    styleUrls: ['./year-view.component.css']
})
export class KalYearViewComponent implements OnInit, OnDestroy {

    public year: Year;
    private selectedDay: Day;
    private subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private viewsFacade: ViewsFacade,
        private appService: AppService,
        private routerService: RouterService
    ) {
        this.subscription = this.appService.date.subscribe(d => {
            this.year = new Year(d.getFullYear());
            this.selectedDay = this.year.selectDate(this.appService.currentDate);
            this.year.months.forEach(m => {
                this.viewsFacade.populateDays(m.days);
            })
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
        console.log('KalYearViewComponent ngOnDestroy', this.appService.currentDate);
        this.subscription.unsubscribe();
    }

    showDayDetail(event: Day) {
        this.appService.selectDate(event.date);
        this.selectedDay = this.year.selectDate(this.appService.currentDate);
        this.routerService.navigateToDay();
    }

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }
}
