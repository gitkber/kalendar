import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DayModalComponent } from "../day-modal/day-modal.component";
import { Day } from '../day';

@Component({
    selector: 'day-in-one-week',
    templateUrl: 'day-in-one-week.component.html',
    styleUrls: ['./day-in-one-week.component.css']
})
export class DayInOneWeekComponent {

    @Input() day: Day;
    @Output() navigateToMonthClick: EventEmitter<Date> = new EventEmitter();
    @Output() navigateToYearClick: EventEmitter<Date> = new EventEmitter();

    @ViewChild(DayModalComponent) modal: DayModalComponent;

    constructor() { }

    navigateToMonth() {
        this.navigateToMonthClick.emit(this.day.date);
    }

    navigateToYear() {
        this.navigateToYearClick.emit(this.day.date);
    }

    showModal() {
        this.modal.open(this.day);
    }
}
