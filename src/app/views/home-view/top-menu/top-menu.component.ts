import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToKalYear() {
    this.router.navigateByUrl('/kalyear');
  }
  navigateToKalMonth() {
    this.router.navigateByUrl('/kalmonth');
  }
  navigateToPersons() {
    this.router.navigateByUrl('/persons');
  }
  
}
