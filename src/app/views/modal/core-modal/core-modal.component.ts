import { Component, HostListener, Input } from '@angular/core';
import { Navigation } from '../../../kalendar/navigation';
import { DayItem } from '../../../kalendar/day-item';
import { AppService } from '../../../app.service';
import { CoreFacade } from '../../../core/core.facade';
import { Contact, ContactAction } from '../../../core/contact/contact';
import { ContactHoliday, ContactHolidayAction } from '../../../core/holiday/contact-holiday/contact-holiday';
import { PublicHoliday, PublicHolidayAction } from '../../../core/holiday/public-holiday/public-holiday';
import { Memo, MemoAction } from '../../../core/memo/memo';

@Component({
    selector: 'core-modal',
    templateUrl: './core-modal.component.html',
    styleUrls: ['./core-modal.component.css']
})
export class CoreModalComponent {

    @Input() blocking = false;

    public isOpen = false;
    public dayItem: DayItem;

    public memoSelected: Memo;
    public contactSelected: Contact;
    public contactHolidaySelected: ContactHoliday;
    public publicHolidaySelected: PublicHoliday;

    constructor(
        private appService: AppService,
        private coreFacade: CoreFacade,
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
        // this.date = date;
        // this.memoSelected = new Memo(null, null, this.dateUtilService.toString(this.date));
        // this.editMemos();
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    showDayItem(event: DayItem) {
        if (event.isContact()) {
            this.contactSelected = new Contact(null, event.principalItem, event.additionalItem, event.date);
            if (event.key !== null) {
                this.contactSelected['$key'] = event.key;
            }
        } else if (event.isMemo()) {
            this.memoSelected = new Memo(null, event.principalItem, event.date);
            if (event.key !== null) {
                this.memoSelected['$key'] = event.key;
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

    doActionOnMemo(event: MemoAction) {
        this.coreFacade.memoService.doActionOnMemo(event);
        this.close();
    }

    doActionOnContact(event: ContactAction) {
        this.coreFacade.contactService.doActionOnContact(event);
        this.close();
    }

    doActionOnContactHoliday(event: ContactHolidayAction) {
        this.coreFacade.contactHolidayService.doActionOnContactHoliday(event);
        this.close();
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
        this.coreFacade.publicHolidayService.doActionOnPublicHoliday(event);
        this.close();
    }

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }

}
