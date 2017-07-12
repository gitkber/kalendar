import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Kalendar';
  items: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;

  constructor(private router: Router, public af: AngularFireDatabase, public afAuth: AngularFireAuth) {
    console.log("construcot");
    
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
    this.user = afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

}
