import { Component, Input, OnInit } from '@angular/core';
import { OneWeek } from './one-week';

@Component({
    selector: 'one-week',
    templateUrl: './one-week.component.html',
    styleUrls: ['./one-week.component.css']
})
export class OneWeekComponent implements OnInit {

    @Input() oneWeek: OneWeek;

    constructor() { }

    ngOnInit() { }

}
