import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Year } from '../../kalendar/year/year';
import { AppService } from '../../app.service';
import { Day } from '../../kalendar/day/day';

@Component({
    selector: 'kal-year-view',
    templateUrl: './kal-year-view.component.html',
    styleUrls: ['./kal-year-view.component.css']
})
export class KalYearViewComponent implements OnInit {

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

}
