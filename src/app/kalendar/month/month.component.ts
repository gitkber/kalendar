import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Month } from "./month";
import { Day } from "../day/day";

@Component({
    selector: 'month',
    templateUrl: 'month.component.html',
    styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

    @Input() month: Month;
    @Output() showDayDetailClick: EventEmitter<any> = new EventEmitter();
    @Output() nextClick: EventEmitter<any> = new EventEmitter();
    @Output() previousClick: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    goNext(event:String) {
        this.nextClick.emit(event);
    }

    goPrevious(event:String) {
        this.previousClick.emit(event);
    }

    showDayDetail(day: Day) {
        this.showDayDetailClick.emit(day);
    }
}