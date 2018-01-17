import { Component, HostListener, Input } from '@angular/core';
import { Navigation } from '../../../kalendar/navigation';
import { DayItem } from '../../../kalendar/day-item';
import { AppService } from '../../../app.service';
import { ViewsFacade } from '../../views.facade';
import { Contact, ContactAction } from '../../../core/contact/contact';
import { ContactHoliday, ContactHolidayAction } from '../../../core/holiday/contact-holiday/contact-holiday';
import { PublicHoliday, PublicHolidayAction } from '../../../core/holiday/public-holiday/public-holiday';
import { Event, EventAction } from '../../../core/event/event';

@Component({
    selector: 'core-modal',
    templateUrl: './core-modal.component.html',
    styleUrls: ['./core-modal.component.css']
})
export class CoreModalComponent {

    @Input() blocking = false;

    public isOpen = false;
    public dayItem: DayItem;

    public eventSelected: Event;
    public contactSelected: Contact;
    public contactHolidaySelected: ContactHoliday;
    public publicHolidaySelected: PublicHoliday;

    constructor(
        private appService: AppService,
        private viewsFacade: ViewsFacade,
    ) {
        console.log('CoreModalComponent');
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        console.log('escape', event);
        this.close();
    }

    open(dayItem: DayItem): void {
        this.isOpen = true;
        this.dayItem = dayItem;
        this.showDayItem(dayItem);
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    showDayItem(event: DayItem) {
        if (event.isContact()) {
            this.contactSelected = new Contact(event.principalItem, event.additionalItem, event.date);
            if (event.key !== null) {
                this.contactSelected['$key'] = event.key;
            }
        } else if (event.isEvent()) {
            this.eventSelected = new Event(event.principalItem, event.date);
            if (event.key !== null) {
                this.eventSelected['$key'] = event.key;
            }
        } else if (event.isContactHoliday()) {
            this.contactHolidaySelected = new ContactHoliday(null, null, event.principalItem, event.date);
            if (event.key !== null) {
                this.contactHolidaySelected['$key'] = event.key;
            }
        } else if (event.isPublicHoliday()) {
            this.publicHolidaySelected = new PublicHoliday(null, event.principalItem, event.date);
            if (event.key !== null) {
                this.publicHolidaySelected['$key'] = event.key;
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

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }

}
