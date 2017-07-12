import { Component, OnInit } from '@angular/core';
import { OneWeek } from '../../kalendar/one-week/one-week';
import { CoreService } from '../../core/core.service';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    public oneWeek: OneWeek;

    constructor(private coreService: CoreService) { }

    ngOnInit() {
        this.oneWeek = new OneWeek(new Date());
        this.coreService.populateFourDays(this.oneWeek);
    }

    nextDay(event) {
        // event.navigation === day
        this.coreService.populateDayInFourDays(this.oneWeek.next());
    }

    previousDay(event) {
        // event.navigation === day
        this.coreService.populateDayInFourDays(this.oneWeek.previous());
    }
}
