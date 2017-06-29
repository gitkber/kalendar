import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Day } from "../day";

@Component({
    selector: 'day-in-month',
    templateUrl: 'day-in-month.component.html',
    styleUrls: ['./day-in-month.component.css']
})
export class DayInMonthComponent implements OnInit {

    @Input() day: Day;

    constructor() { }

    ngOnInit() {

    }

}