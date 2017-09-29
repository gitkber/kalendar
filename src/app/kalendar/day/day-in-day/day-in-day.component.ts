import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../day';
import { DayItem } from '../../day-item';
import { Type } from '../../type';

@Component({
    selector: 'day-in-day',
    templateUrl: 'day-in-day.component.html',
    styleUrls: ['./day-in-day.component.css']
})
export class DayInDayComponent {

    @Input() day: Day;
    @Output() navigateToMonthClick: EventEmitter<Date> = new EventEmitter();
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();

    constructor() { }

    navigateToMonth() {
        this.navigateToMonthClick.emit(this.day.date);
    }

    firstCharToUpperCase(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    showDayItem(dayItem: DayItem) {
        this.showDayItemClick.emit(dayItem);
    }

    addDayItemContact() {
        this.showDayItemClick.emit(new DayItem(Type.CONTACT, null, null, null));
    }

    addDayItemMemo() {
        this.showDayItemClick.emit(new DayItem(Type.MEMO, null, null));
    }

    addDayItemContactHoliday() {
        this.showDayItemClick.emit(new DayItem(Type.CONTACT_HOLIDAY, null, null));
    }

    addDayItemPublicHoliday() {
        this.showDayItemClick.emit(new DayItem(Type.PUBLIC_HOLIDAY, null, null));
    }
}
