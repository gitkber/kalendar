import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../day';

@Component({
    selector: 'day-in-year',
    templateUrl: './day-in-year.component.html',
    styleUrls: ['./day-in-year.component.css']
})
export class DayInYearComponent implements OnInit {

    @Input() day: Day;

    constructor() { }

    ngOnInit() {
    }

}
