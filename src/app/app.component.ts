import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './core/service/auth.service';
import { RouterService } from './core/service/router.service';
import { AppService } from './app.service';
import { Navigation } from './kalendar/navigation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public user: Observable<firebase.User>;

    constructor(public authService: AuthService, public routerService: RouterService, public appService: AppService) {
        this.user = this.authService.currentUserObservable;
        console.log(this.user);
    }

    navigate(event: Navigation) {
        if (event.isNext) {
            if (event.navigation === 'month') {
                this.appService.nextMonth();
            } else if (event.navigation === 'year') {
                this.appService.nextYear();
            }
        } else if (event.isPrevious) {
            if (event.navigation === 'month') {
                this.appService.previousMonth();
            } else if (event.navigation === 'year') {
                this.appService.previousYear();
            }
        } else if (event.isToday) {
            this.appService.selectDate(new Date());
        } else {
            console.warn('ERROR in AppView - Navigation');
        }
    }

    navigateToKalYear() {
        this.routerService.navigateToKalYear(this.appService.currentDate);
    }

}
