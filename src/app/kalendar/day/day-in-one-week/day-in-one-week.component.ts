import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { KalModalService } from '../../../common/kal-modal/kal-modal.service';
import { KalModalComponent } from "../../../common/kal-modal/kal-modal.component";
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

    @ViewChild(KalModalComponent) modal: KalModalComponent;

    constructor(public kalModalService: KalModalService) { }

    navigateToMonth() {
        this.navigateToMonthClick.emit(this.day.date);
    }

    navigateToYear() {
        this.navigateToYearClick.emit(this.day.date);
    }

    showModal() {
        console.log('zzzz');
        this.kalModalService.registerModal(this.modal);
        this.kalModalService.open("modalId");
    }
}
