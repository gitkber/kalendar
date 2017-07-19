import { Component } from '@angular/core';
import { AuthService } from './core/service/auth.service';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './core/service/router.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Kalendar';
    user: Observable<firebase.User>;

    constructor(public authService: AuthService, public routerService: RouterService) {
        this.user = this.authService.currentUserObservable;
        console.log(this.user);
    }

}
