import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../app.service';
import { DayModalComponent } from '../modal/day-modal/day-modal.component';
import { Year } from '../../kalendar/year/year';
import { Day } from '../../kalendar/day/day';

@Component({
    selector: 'kal-year-view',
    templateUrl: './kal-year-view.component.html',
    styleUrls: ['./kal-year-view.component.css']
})
export class KalYearViewComponent implements OnInit, OnDestroy {

    @ViewChild(DayModalComponent) modal: DayModalComponent;

    public year: Year;
    private selectedDay: Day;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private appService: AppService) {
        this.subscription = this.appService.date.subscribe(d => {
            this.year = new Year(d.getFullYear());
            this.selectedDay = this.year.selectDate(this.appService.currentDate);
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
        this.modal.open(this.selectedDay);
    }

}
