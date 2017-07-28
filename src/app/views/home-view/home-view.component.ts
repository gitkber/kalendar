import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { RouterService } from '../../core/service/router.service';
import { AppService } from '../../app.service';
import { DayModalComponent } from '../modal/day-modal/day-modal.component';
import { Navigation } from '../../kalendar/navigation';
import { Day } from '../../kalendar/day/day';
import { Week } from '../../kalendar/week/week';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    @ViewChild(DayModalComponent) modal: DayModalComponent;

    public week: Week;
    private selectedDay: Day;

    constructor(private routerService: RouterService, private coreService: CoreService, private appService: AppService) { }

    ngOnInit() {
        this.week = new Week(this.appService.currentDate);
        this.selectedDay = this.week.selectDate(this.appService.currentDate);
        this.coreService.populateDays(this.week.days);
    }

    navigate(event: Navigation) {
        if (event.isToday) {
            console.warn('TODO navigation to today')
        } else if (event.isNext) {
            this.coreService.populateDays(this.week.next());
            this.selectedDay = this.week.selectDate(this.appService.currentDate);
        } else if (event.isPrevious) {
            this.coreService.populateDays(this.week.previous());
            this.selectedDay = this.week.selectDate(this.appService.currentDate);
        } else if (event.isMonth) {
            this.routerService.navigateToKalMonth(event.toDate);
        } else if (event.isYear) {
            this.routerService.navigateToKalYear(event.toDate);
        } else {
            console.warn('ERROR in HomeView - Navigation');
        }
    }

    showDayDetail(event: Day) {
        this.appService.selectDate(event.date);
        this.selectedDay = this.week.selectDate(this.appService.currentDate);
        this.modal.open(event);
    }

}
