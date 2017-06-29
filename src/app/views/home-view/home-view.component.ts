import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

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
