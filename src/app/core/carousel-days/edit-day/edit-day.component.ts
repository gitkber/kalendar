import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Navigation } from '../../../kalendar/navigation';
import { DayItem } from '../../../kalendar/day-item';
import { AppService } from '../../../app.service';
import { Contact } from '../../contact/contact';
import { Budget } from '../../budget/budget';
import { Event } from '../../event/event';
import { TagBudgetOperation, TagBudgetType, TagHolidayType } from '../../../common/utils/tag';
import { ViewsFacade } from '../../../views/views.facade';
import { Holiday } from '../../holiday/holiday';

@Component({
    selector: 'edit-day',
    templateUrl: './edit-day.component.html',
    styleUrls: ['./edit-day.component.css']
})
export class EditDayComponent {

    @Output() closeEditDayClick: EventEmitter<any> = new EventEmitter();

    public eventSelected: Observable<Event>;
    public contactSelected: Observable<Contact>;
    public holidaySelected: Observable<Holiday>;
    public budgetSelected: Observable<Budget>;
    public fillOnlyYear: boolean;

    constructor(
        private appService: AppService,
        private viewsFacade: ViewsFacade,
    ) { }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        console.log('escape', event);
        this.close();
    }

    open(dayItem: DayItem): void {
        this.showDayItem(dayItem);
    }

    close(): void {
        this.closeEditDayClick.emit();
    }

    showDayItem(event: DayItem) {
        this.contactSelected = undefined;
        this.eventSelected = undefined;
        this.holidaySelected = undefined;
        this.budgetSelected = undefined;
        if (event.isContact()) {
            this.fillOnlyYear = true;
            if (event.key !== null) {
                this.contactSelected = this.viewsFacade.contactService.getContact(event.key);
            } else {
                this.contactSelected = Observable.of(new Contact(null, null, event.date));
            }
        } else if (event.isEvent()) {
            if (event.key !== null) {
                this.eventSelected = this.viewsFacade.eventService.getEvent(event.key);
            } else {
                this.eventSelected = Observable.of(new Event(null, event.date));
            }
        } else if (event.isContactHoliday()) {
            if (event.key !== null) {
                this.holidaySelected = this.viewsFacade.holidayService.getHoliday(event.key);
            } else {
                this.holidaySelected = Observable.of(new Holiday(TagHolidayType.CONTACT, null, event.date));
            }
        } else if (event.isPublicHoliday()) {
            if (event.key !== null) {
                this.holidaySelected = this.viewsFacade.holidayService.getHoliday(event.key);
            } else {
                this.holidaySelected = Observable.of(new Holiday(TagHolidayType.PUBLIC, null, event.date));
            }
        } else if (event.isBudget()) {
            if (event.key !== null) {
                this.budgetSelected = this.viewsFacade.budgetService.getBudget(event.key);
            } else {
                this.budgetSelected = Observable.of(new Budget(TagBudgetOperation.MIN, TagBudgetType.FOOD, null, event.date, null));
            }
        }
    }

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }

}
