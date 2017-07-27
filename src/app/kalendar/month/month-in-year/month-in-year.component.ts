import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'month-in-year',
    templateUrl: './month-in-year.component.html',
    styleUrls: ['./month-in-year.component.css']
})
export class MonthInYearComponent implements OnInit {

    @Input() labelMonth: string;

    constructor() { }

    ngOnInit() {
    }

}
