import { Component, OnInit, ViewChild } from '@angular/core';
import { OneWeek } from '../../kalendar/one-week/one-week';
import { CoreService } from '../../core/core.service';
import { RouterService } from '../../core/service/router.service';
import { DayModalComponent } from '../modal/day-modal/day-modal.component';
import { Day } from '../../kalendar/day/day';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    @ViewChild(DayModalComponent) modal: DayModalComponent;

    public oneWeek: OneWeek;

    constructor(public routerService: RouterService, private coreService: CoreService) { }

    ngOnInit() {
        this.oneWeek = new OneWeek(new Date());
        this.coreService.populateDays(this.oneWeek.days);
    }

    nextDay(event) {
        // event.navigation === day
        this.coreService.populateDays(this.oneWeek.next());
    }

    previousDay(event) {
        // event.navigation === day
        this.coreService.populateDays(this.oneWeek.previous());
    }

    showDayDetail(event: Day) {
        this.modal.open(event);
    }

}
