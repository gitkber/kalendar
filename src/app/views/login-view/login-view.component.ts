import { Component, OnInit } from '@angular/core';
import { User } from '../../core/user/user';

@Component({
  selector: 'login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  public user: User;

  constructor() { }

  ngOnInit() {
  }

  setDemoLogin() {
    console.log('test');

    this.user = new User(null, 'toto.test@gmail.com', 'bonjour');
    // this.user = new User(null, 'kslyfe.demo@gmail.com', 'matouchka*');
  }

}
