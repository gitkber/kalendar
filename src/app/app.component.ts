import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Kalendar';
  user: Observable<firebase.User>;

  constructor(public authService: AuthService) { 
    this.user = this.authService.currentUserObservable;
  }

  logout() {
    this.authService.signOut();
  }

}
