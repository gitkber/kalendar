import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  userFounded = true;
  //alert = {type:'error', message:'en cours de development'}
  alert = {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/home');
  }

}
