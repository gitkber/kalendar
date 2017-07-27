import { Component, Input, OnInit } from '@angular/core';
import { Year } from '../year';

@Component({
    selector: 'one-year',
    templateUrl: './one-year.component.html',
    styleUrls: ['./one-year.component.css']
})
export class OneYearComponent implements OnInit {

    @Input() year: Year;

    constructor() { }

    ngOnInit() {
    }

}
