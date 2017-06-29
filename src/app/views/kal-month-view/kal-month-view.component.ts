import { Component, OnInit } from '@angular/core';
import { Month } from "../../kalendar/month/month";

@Component({
  selector: 'kal-month-view',
  templateUrl: './kal-month-view.component.html',
  styleUrls: ['./kal-month-view.component.css']
})
export class KalMonthViewComponent implements OnInit {

  private month: Month;

  constructor() { }

  ngOnInit() {
    let today: Date = new Date();
    this.month = new Month(today.getMonth() + 1, today.getFullYear());
  }

}
