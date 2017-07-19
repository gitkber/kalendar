import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DayModalService } from '../day-modal/day-modal.service';
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

    constructor(public dayModalService: DayModalService) { }

    navigateToMonth() {
        this.navigateToMonthClick.emit(this.day.date);
    }

    navigateToYear() {
        this.navigateToYearClick.emit(this.day.date);
    }

    showModal() {
        console.log('zzzz');
        this.dayModalService.registerModal(this.modal);
        this.dayModalService.open("modalId", this.day);
    }
}
