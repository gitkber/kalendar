import { Component, OnInit } from '@angular/core';
import { OneWeek } from '../../kalendar/one-week/one-week';
import { CoreService } from '../../core/core.service';
import { Router } from '@angular/router';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    public oneWeek: OneWeek;

    constructor(private router: Router, private coreService: CoreService) { }

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

    navigateToMonth(event: Date) {
        this.router.navigate(['/kalmonth', event.toISOString().substring(0, 10)]);
    }

    navigateToYear(event: Date) {
        this.router.navigate(['/kalyear', event.toISOString().substring(0, 10)]);
    }
}
