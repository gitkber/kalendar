import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Day } from "../../kalendar/day/day";

@Component({
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  private day1: Day;  
  private day2: Day;  
  private day3: Day;  
  private day4: Day;  

  constructor(private router: Router) { }

  ngOnInit() {
    let today:Date = new Date();
    let dayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12, 0, 0);
    this.day1 = new Day(dayDate, today);
    this.day2 = new Day(today, today);
    dayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0, 0);
    this.day3 = new Day(dayDate, today);
    dayDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 1, 12, 0, 0);
    this.day4 = new Day(dayDate, today);
    dayDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 1, 12, 0, 0);
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
