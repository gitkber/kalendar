import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { RouterService } from '../../core/service/router.service';
import { AppService } from '../../app.service';
import { DayModalComponent } from '../modal/day-modal/day-modal.component';
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

    constructor(public routerService: RouterService, private coreService: CoreService, private appService: AppService) { 
        console.log('HomeViewComponent constructor', this.appService.currentDate);
    }

    ngOnInit() {
        this.appService.selectDate(new Date());
        console.log('HomeViewComponent ngOnInit', this.appService.currentDate);
        this.week = new Week(this.appService.currentDate);
        this.selectedDay = this.week.selectDate(this.appService.currentDate);
        this.coreService.populateDays(this.week.days);
    }

    next(event) {
        // event.navigation === day
        this.coreService.populateDays(this.week.next());
        this.selectedDay = this.week.selectDate(this.appService.currentDate);
    }

    previous(event) {
        // event.navigation === day
        this.coreService.populateDays(this.week.previous());
        this.selectedDay = this.week.selectDate(this.appService.currentDate);
    }

    showDayDetail(event: Day) {
        this.appService.selectDate(event.date);
        this.selectedDay = this.week.selectDate(this.appService.currentDate);
        this.modal.open(event);
    }

}
