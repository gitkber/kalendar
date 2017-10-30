import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../day';
import { Navigation } from '../../navigation';
import { Type } from '../../type';
import { DayItem } from '../../day-item';
import { DateUtilService } from '../../../common/utils/date-util.service';

@Component({
    selector: 'day-in-carousel-days',
    templateUrl: 'day-in-carousel-days.component.html',
    styleUrls: ['./day-in-carousel-days.component.css']
})
export class DayInCarouselDaysComponent {

    @Input() day: Day;
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();

    constructor(private dateUtilService: DateUtilService) { }

    navigateToMonth() {
        const navigation: Navigation = new Navigation('day');
        navigation.isMonth = true;
        navigation.toDate = this.day.date;
        this.navigateClick.emit(navigation);
    }

    navigateToYear() {
        const navigation: Navigation = new Navigation('day');
        navigation.isYear = true;
        navigation.toDate = this.day.date;
        this.navigateClick.emit(navigation);
    }

    navigateToDay() {
        const navigation: Navigation = new Navigation('day');
        navigation.isDay = true;
        navigation.toDate = this.day.date;
        this.navigateClick.emit(navigation);
    }

    firstCharToUpperCase(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    editDayItem(event: DayItem) {
        this.showDayItemClick.emit(event);
    }

    addDayItemContact() {
        this.showDayItemClick.emit(new DayItem(Type.CONTACT, null, this.dateUtilService.toString(this.day.date), null, null));
    }

    addDayItemMemo() {
        this.showDayItemClick.emit(new DayItem(Type.MEMO, null, this.dateUtilService.toString(this.day.date), null));
    }

    addDayItemContactHoliday() {
        this.showDayItemClick.emit(new DayItem(Type.CONTACT_HOLIDAY, null, this.dateUtilService.toString(this.day.date), null));
    }

    addDayItemPublicHoliday() {
        this.showDayItemClick.emit(new DayItem(Type.PUBLIC_HOLIDAY, null, this.dateUtilService.toString(this.day.date), null));
    }
}
