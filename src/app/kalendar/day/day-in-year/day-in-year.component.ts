import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'day-in-year',
    templateUrl: './day-in-year.component.html',
    styleUrls: ['./day-in-year.component.css']
})
export class DayInYearComponent implements OnInit {

    @Input() labelDay: string;

    constructor() { }

    ngOnInit() {
    }

}
