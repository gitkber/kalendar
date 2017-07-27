import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { RouterService } from '../../core/service/router.service';
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

    constructor(public routerService: RouterService, private coreService: CoreService) { }

    ngOnInit() {
        this.week = new Week(new Date());
        this.coreService.populateDays(this.week.days);
    }

    nextDay(event) {
        // event.navigation === day
        this.coreService.populateDays(this.week.next());
    }

    previousDay(event) {
        // event.navigation === day
        this.coreService.populateDays(this.week.previous());
    }

    showDayDetail(event: Day) {
        this.modal.open(event);
    }

}
