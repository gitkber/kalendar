import { Component, OnInit } from '@angular/core';
import { Month } from '../../kalendar/month/month';
import { Day } from '../../kalendar/day/day';
import { CoreService } from '../../core/core.service';

@Component({
    selector: 'kal-month-view',
    templateUrl: './kal-month-view.component.html',
    styleUrls: ['./kal-month-view.component.css']
})
export class KalMonthViewComponent implements OnInit {

    private month: Month;
    private selectedDay: Day;

    constructor(private coreService: CoreService) { }

    ngOnInit() {
        const today: Date = new Date();
        this.month = new Month(today.getMonth() + 1, today.getFullYear());
        this.selectedDay = this.month.selectDate(today);
        this.coreService.populateMonth(this.month);
    }

    goNext(event: String) {
        if (event === 'month') {
            this.month.next();
        } else if (event === 'year') {
            this.month.jump(this.month.month, this.month.year + 1);
        }
        this.coreService.populateMonth(this.month);
    }

    goPrevious(event: String) {
        if (event === 'month') {
            this.month.previous();
        } else if (event === 'year') {
            this.month.jump(this.month.month, this.month.year - 1);
        }
        this.coreService.populateMonth(this.month);
    }

    showDayDetail(event: Day) {
        if (event.isDisabled) {
            this.changeMonth(event.date);
        } else {
            if (this.selectedDay) {
                this.selectedDay.isSelected = false;
            }
            this.selectedDay = event;
            this.selectedDay.isSelected = true;
        }
    }

    changeMonth(event: Date) {
        this.month.jump(event.getMonth() + 1, event.getFullYear());
        this.selectedDay = this.month.selectDate(event);
    }

}
