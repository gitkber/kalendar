import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CoreService } from '../../core/core.service';
import { AppService } from '../../app.service';
import { DayModalComponent } from '../modal/day-modal/day-modal.component';
import { Month } from '../../kalendar/month/month';
import { Day } from '../../kalendar/day/day';
import { Navigation } from '../../kalendar/navigation';

@Component({
    selector: 'kal-month-view',
    templateUrl: './kal-month-view.component.html',
    styleUrls: ['./kal-month-view.component.css']
})
export class KalMonthViewComponent implements OnInit, OnDestroy {

    @ViewChild(DayModalComponent) modal: DayModalComponent;

    public month: Month;
    private selectedDay: Day;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private coreService: CoreService, private appService: AppService) {
        this.subscription = this.appService.date.subscribe(d => {
            this.month = new Month(d.getMonth() + 1, d.getFullYear());
            this.selectedDay = this.month.selectDate(this.appService.currentDate);
            this.coreService.populateDays(this.month.days);
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
            this.modal.open(this.selectedDay);
        }
    }

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }
}
