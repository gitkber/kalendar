import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  userFounded = true;
  //alert = {type:'error', message:'en cours de development'}
  alert = {};
  user: Observable<firebase.User>;

  email:string = "toto.test@gmail.com";
  pwd:string = "bonjour";

  constructor(private router: Router, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  ngOnInit() { }

  login() {
    // "toto.test@gmail.com"
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pwd)
      .then(success => {
        console.log("success", success)
        this.router.navigateByUrl('/home');
      }).catch(err => {
        console.log("error", err)
        this.alert = { type: 'error', message: err.message }
      });
  }

}
