import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Month } from './month';
import { Day } from '../day/day';

@Component({
    selector: 'month',
    templateUrl: 'month.component.html',
    styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

    @Input() month: Month;
    @Output() showDayDetailClick: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    showDayDetail(day: Day) {
        this.showDayDetailClick.emit(day);
    }
}
