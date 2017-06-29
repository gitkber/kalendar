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

    goNext(event: String) {
        if (event === "month") {
            this.month.next();
        } else if (event === "year") {
            this.month.jump(this.month.month, this.month.year + 1);
        }
    }

    goPrevious(event: String) {
        if (event === "month") {
            this.month.previous();
        } else if (event === "year") {
            this.month.jump(this.month.month, this.month.year - 1);
        }
    }

}
