import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Month } from '../month';
import { Day } from '../../day/day';

@Component({
    selector: 'month-in-year',
    templateUrl: './month-in-year.component.html',
    styleUrls: ['./month-in-year.component.css']
})
export class MonthInYearComponent implements OnInit {

    @Input() month: Month;
    @Output() showDayDetailClick: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    showDayDetail(event: Day) {
        this.showDayDetailClick.emit(event);
    }
}
