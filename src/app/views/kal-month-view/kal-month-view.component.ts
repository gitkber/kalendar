import { Component, OnDestroy, OnInit } from '@angular/core';
import { Month } from '../../kalendar/month/month';
import { Day } from '../../kalendar/day/day';
import { CoreService } from '../../core/core.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'kal-month-view',
    templateUrl: './kal-month-view.component.html',
    styleUrls: ['./kal-month-view.component.css']
})
export class KalMonthViewComponent implements OnInit, OnDestroy {

    public month: Month;
    private selectedDay: Day;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private coreService: CoreService, private appService: AppService) {
        this.subscription = this.appService.date.subscribe(d => {
            console.log('KalMonthViewComponent constructor', d);
            this.month = new Month(d.getMonth() + 1, d.getFullYear());
            this.coreService.populateMonth(this.month);
        })
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const selectedDate: Date = new Date(params['date']);
            this.month = new Month(selectedDate.getMonth() + 1, selectedDate.getFullYear());
            this.selectedDay = this.month.selectDate(selectedDate);
            this.coreService.populateMonth(this.month);
        });
    }

    ngOnDestroy(): void {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    showDayDetail(event: Day) {
        if (event.isDisabled) {
            this.month.jump(event.date.getMonth() + 1, event.date.getFullYear());
            this.selectedDay = this.month.selectDate(event.date);
        } else {
            if (this.selectedDay) {
                this.selectedDay.isSelected = false;
            }
            this.selectedDay = event;
            this.selectedDay.isSelected = true;
        }
    }

}
