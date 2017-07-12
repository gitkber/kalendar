import { Component, OnInit } from '@angular/core';
import { FourDays } from '../../kalendar/four-days/four-days';
import { CoreService } from '../../core/core.service';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    private fourDays: FourDays;

    constructor(private coreService: CoreService) { }

    ngOnInit() {
        this.fourDays = new FourDays(new Date());
        this.coreService.populateFourDays(this.fourDays);
    }

    nextDay(event) {
        // event.navigation === day
        this.coreService.populateDayInFourDays(this.fourDays.next());
    }

    previousDay(event) {
        // event.navigation === day
        this.coreService.populateDayInFourDays(this.fourDays.previous());
    }
}
