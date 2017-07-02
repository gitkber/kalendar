import { Component, OnInit } from '@angular/core';
import { FourDays } from "../../kalendar/four-days/four-days";

@Component({
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  private fourDays: FourDays;

  constructor() { }

  ngOnInit() {
    this.fourDays = new FourDays(new Date());
  }

  nextDay(event) {
    // event.navigation === day
    this.fourDays.next();
  }
  previousDay(event) {
    // event.navigation === day
    this.fourDays.previous();
  }
}
