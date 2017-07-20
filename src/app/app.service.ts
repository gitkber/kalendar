import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { OneWeek } from './kalendar/one-week/one-week';
import { CoreService } from './core/core.service';

@Injectable()
export class AppService {

    public currentDate: Date;

    // public oneWeek: OneWeek;

    constructor(private coreService: CoreService) {
        this.currentDate = new Date();
        // this.oneWeek = new OneWeek(this.currentDate);

    }

    // onInitOneWeek() {
    //     this.coreService.populateFourDays(this.oneWeek);
    // }
    //
    // nextDay(event) {
    //     // event.navigation === day
    //     this.coreService.populateDayInFourDays(this.oneWeek.next());
    // }
    //
    // previousDay(event) {
    //     // event.navigation === day
    //     this.coreService.populateDayInFourDays(this.oneWeek.previous());
    // }
}
