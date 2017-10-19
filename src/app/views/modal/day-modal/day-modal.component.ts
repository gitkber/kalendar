import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Navigation } from '../../../kalendar/navigation';
import { Day } from '../../../kalendar/day/day';
import { DayItem } from '../../../kalendar/day-item';
import { AppService } from '../../../app.service';
import { DateUtilService } from '../../../core/service/date-util.service';
import { CoreFacade } from '../../../core/core.facade';
import { Contact, ContactAction } from '../../../core/contact/contact';
import { ContactHoliday, ContactHolidayAction } from '../../../core/holiday/contact-holiday/contact-holiday';
import { PublicHoliday, PublicHolidayAction } from '../../../core/holiday/public-holiday/public-holiday';
import { Memo, MemoAction } from '../../../core/memo/memo';

@Component({
    selector: 'day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit, OnDestroy {

    @Input() blocking = false;

    public isOpen = false;
    public day: Day;

    private subscription: Subscription;

    public memoSelected: Memo;
    public contactSelected: Contact;
    public contactHolidaySelected: ContactHoliday;
    public publicHolidaySelected: PublicHoliday;

    public isContactSelected: boolean;
    public isMemoSelected: boolean;
    public isContactHolidaySelected: boolean;
    public isPublicHolidaySelected: boolean;

    constructor(
        private appService: AppService,
        private coreFacade: CoreFacade,
        private dateUtilService: DateUtilService
    ) {
        console.log('DayModalComponent');
        this.isMemoSelected = true;
        this.subscription = this.appService.date.subscribe(d => {
            this.day = new Day(d, new Date());
            this.memoSelected = new Memo(null, null, this.dateUtilService.toString(this.day.date));
            this.contactSelected = new Contact(null, '', '', this.dateUtilService.toString(this.day.date));
            this.contactHolidaySelected = new ContactHoliday(null, null, null, this.dateUtilService.toString(this.day.date));
            this.publicHolidaySelected = new PublicHoliday(null, null, this.dateUtilService.toString(this.day.date));
            const days: Day[] = [];
            days.push(this.day);
            this.coreFacade.populateDays(days);
        })
    }

    ngOnInit() { }

    ngOnDestroy(): void {
        // unsubscribe to ensure no memory leaks
        console.log('DayViewComponent ngOnDestroy', this.appService.currentDate);
        this.subscription.unsubscribe();
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        console.log('escape', event);
        this.close();
    }

    open(day: Day): void {
        this.isOpen = true;
        this.day = day;
        this.memoSelected = new Memo(null, null, this.dateUtilService.toString(this.day.date));
        this.editMemos();
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    editContact() {
        this.isContactSelected = true;
        this.isMemoSelected = false;
        this.isContactHolidaySelected = false;
        this.isPublicHolidaySelected = false;
    }

    editMemos() {
        this.isContactSelected = false;
        this.isMemoSelected = true;
        this.isContactHolidaySelected = false;
        this.isPublicHolidaySelected = false;
    }

    editContactHolidays() {
        this.isContactSelected = false;
        this.isMemoSelected = false;
        this.isContactHolidaySelected = true;
        this.isPublicHolidaySelected = false;
    }

    editPublicHolidays() {
        this.isContactSelected = false;
        this.isMemoSelected = false;
        this.isContactHolidaySelected = false;
        this.isPublicHolidaySelected = true;
    }

    showDayItem(event: DayItem) {
        if (event.isContact()) {
            this.editContact();
            this.contactSelected = new Contact(null, event.principalItem, event.additionalItem, event.date);
            this.contactSelected['$key'] = event.key;
        } else if (event.isMemo()) {
            this.editMemos();
            this.memoSelected = new Memo(null, event.principalItem, event.date);
            this.memoSelected['$key'] = event.key;
        } else if (event.isContactHoliday()) {
            this.editContactHolidays();
            this.contactHolidaySelected = new ContactHoliday(null, null, event.principalItem, event.date);
            this.contactHolidaySelected['$key'] = event.key;
        } else if (event.isPublicHoliday()) {
            this.editPublicHolidays();
            this.publicHolidaySelected = new PublicHoliday(null, event.principalItem, event.date);
            this.publicHolidaySelected['$key'] = event.key;
        }
    }

    doActionOnMemo(event: MemoAction) {
        this.coreFacade.memoService.doActionOnMemo(event);
    }

    doActionOnContact(event: ContactAction) {
        this.coreFacade.contactService.doActionOnContact(event);
    }

    doActionOnContactHoliday(event: ContactHolidayAction) {
        this.coreFacade.contactHolidayService.doActionOnContactHoliday(event);
    }

    doActionOnPublicHoliday(event: PublicHolidayAction) {
        this.coreFacade.publicHolidayService.doActionOnPublicHoliday(event);
    }

    navigate(event: Navigation) {
        this.appService.navigate(event);
    }

}
