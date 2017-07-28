import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { DayModalComponent } from '../modal/day-modal/day-modal.component';
import { Year } from '../../kalendar/year/year';
import { Day } from '../../kalendar/day/day';

@Component({
    selector: 'kal-year-view',
    templateUrl: './kal-year-view.component.html',
    styleUrls: ['./kal-year-view.component.css']
})
export class KalYearViewComponent implements OnInit {

    @ViewChild(DayModalComponent) modal: DayModalComponent;

    public year: Year;
    private selectedDay: Day;

    constructor(private route: ActivatedRoute, private appService: AppService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const selectedDate: Date = new Date(params['date']);
            this.appService.selectDate(selectedDate);
            this.year = new Year(selectedDate.getFullYear());
            this.selectedDay = this.year.selectDate(this.appService.currentDate);
        });
    }

    showDayDetail(event: Day) {
        this.appService.selectDate(event.date);
        this.selectedDay = this.year.selectDate(this.appService.currentDate);
        this.modal.open(this.selectedDay);
    }

}
