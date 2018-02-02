import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Navigation } from '../../../kalendar/navigation';
import { DayItem } from '../../../kalendar/day-item';
import { AppService } from '../../../app.service';
import { Contact, ContactAction } from '../../contact/contact';
import { ContactHoliday, ContactHolidayAction } from '../../holiday/contact-holiday/contact-holiday';
import { PublicHoliday, PublicHolidayAction } from '../../holiday/public-holiday/public-holiday';
import { Budget, BudgetAction } from '../../budget/budget';
import { Event, EventAction } from '../../event/event';
import { TagBudgetOperation } from '../../../common/utils/tag';
import { ViewsFacade } from '../../../views/views.facade';

@Component({
    selector: 'edit-day',
    templateUrl: './edit-day.component.html',
    styleUrls: ['./edit-day.component.css']
})
export class EditDayComponent {

    @Output() closeEditDayClick: EventEmitter<any> = new EventEmitter();

    public eventSelected: Observable<Event>;
    public contactSelected: Observable<Contact>;
    public contactHolidaySelected: Observable<ContactHoliday>;
    public publicHolidaySelected: Observable<PublicHoliday>;
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
        this.contactHolidaySelected = undefined;
        this.publicHolidaySelected = undefined;
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
                this.contactHolidaySelected = this.viewsFacade.contactHolidayService.getContactHoliday(event.key);
            } else {
                this.contactHolidaySelected = Observable.of(new ContactHoliday(null, null, null, event.date));
            }
        } else if (event.isPublicHoliday()) {
            if (event.key !== null) {
                this.publicHolidaySelected = this.viewsFacade.publicHolidayService.getPublicHoliday(event.key);
            } else {
                this.publicHolidaySelected = Observable.of(new PublicHoliday(null, null, event.date));
            }
        } else if (event.isBudget()) {
            if (event.key !== null) {
                this.budgetSelected = this.viewsFacade.budgetService.getBudget(event.key);
            } else {
                this.budgetSelected = Observable.of(new Budget(TagBudgetOperation.MIN, null, null, event.date, null));
            }
        }
    }

    doActionOnEvent(event: EventAction) {
        this.viewsFacade.eventService.doActionOnEvent(event);
        this.close();
    }

    doActionOnContact(event: ContactAction) {
        this.viewsFacade.contactService.doActionOnContact(event);
        this.close();
    }

    doActionOnContactHoliday(event: ContactHolidayAction) {
        this.viewsFacade.contactHolidayService.doActionOnContactHoliday(event);
        this.close();
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
        this.viewsFacade.publicHolidayService.doActionOnPublicHoliday(event);
        this.close();
    }

    doActionOnBudget(event: BudgetAction) {
        this.viewsFacade.budgetService.doActionOnBudget(event);
        this.close();
    }

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }

}
