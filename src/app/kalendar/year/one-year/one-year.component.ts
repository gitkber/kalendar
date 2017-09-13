import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Year } from '../year';
import { Day } from '../../day/day';
import { Navigation } from '../../navigation';

@Component({
    selector: 'one-year',
    templateUrl: './one-year.component.html',
    styleUrls: ['./one-year.component.css']
})
export class OneYearComponent implements OnInit {

    @Input() year: Year;
    @Output() showDayDetailClick: EventEmitter<any> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    showDayDetail(event: Day) {
        this.showDayDetailClick.emit(event);
    }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }
}
