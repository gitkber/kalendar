import { Component } from '@angular/core';
import { AuthService } from './core/service/auth.service';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './core/service/router.service';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Kalendar';
    user: Observable<firebase.User>;

    constructor(public authService: AuthService, public routerService: RouterService, public appService: AppService) {
        this.user = this.authService.currentUserObservable;
        console.log(this.user);
    }

    next(event: string) {
        if (event === 'month') {
            this.appService.nextMonth();
        } else if (event === 'year') {
            this.appService.nextYear();
        }
    }

    previous(event: string) {
        if (event === 'month') {
            this.appService.previousMonth();
        } else if (event === 'year') {
            this.appService.previousYear();
        }
    }

}
