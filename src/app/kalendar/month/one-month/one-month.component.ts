import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Month } from '../month';
import { Day } from '../../day/day';

@Component({
    selector: 'one-month',
    templateUrl: './one-month.component.html',
    styleUrls: ['./one-month.component.css']
})
export class OneMonthComponent implements OnInit {

    @Input() month: Month;
    @Output() showDayDetailClick: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    showDayDetail(day: Day) {
        this.showDayDetailClick.emit(day);
    }
}
