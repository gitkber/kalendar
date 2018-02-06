import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Day } from '../../../kalendar/day/day';
import { Navigation } from '../../../kalendar/navigation';
import { Type } from '../../../kalendar/type';
import { DayItem } from '../../../kalendar/day-item';
import { DateUtilService } from '../../../common/utils/date-util.service';
import { EditDayComponent } from '../edit-day/edit-day.component';

@Component({
    selector: 'day-in-carousel-days',
    templateUrl: 'day-in-carousel-days.component.html',
    styleUrls: ['./day-in-carousel-days.component.css']
})
export class DayInCarouselDaysComponent {

    @ViewChild(EditDayComponent) editDayComponent: EditDayComponent;

    @Input() day: Day;
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();

    public editMode: boolean;

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
        this.editMode = true;
        this.editDayComponent.open(event);
    }

    closeEditMode() {
        this.editMode = false;
    }

    addDayItemContact() {
        console.log('addd');
        this.editMode = true;
        this.editDayComponent.open(new DayItem(Type.CONTACT, null, this.dateUtilService.toString(this.day.date), null, null));
    }

    addDayItemMemo() {
        console.log('addd');
        this.editMode = true;
        this.editDayComponent.open(new DayItem(Type.EVENT, null, this.dateUtilService.toString(this.day.date), null));
    }

    addDayItemBudget() {
        console.log('addd');
        this.editMode = true;
        this.editDayComponent.open(new DayItem(Type.BUDGET, null, this.dateUtilService.toString(this.day.date), null));
    }

    addDayItemContactHoliday() {
        console.log('addd');
        this.editMode = true;
        this.editDayComponent.open(new DayItem(Type.CONTACT_HOLIDAY, null, this.dateUtilService.toString(this.day.date), null));
    }

    addDayItemPublicHoliday() {
        console.log('addd');
        this.editMode = true;
        this.editDayComponent.open(new DayItem(Type.PUBLIC_HOLIDAY, null, this.dateUtilService.toString(this.day.date), null));
    }
}
