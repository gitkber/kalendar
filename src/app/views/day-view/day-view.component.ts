import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../app.service';
import { Navigation } from '../../kalendar/navigation';
import { Day } from '../../kalendar/day/day';
import { MemoCriteria } from '../../core/memo/memo-criteria';
import { CoreFacade } from '../../core/core.facade';
import { DateUtilService } from '../../core/service/date-util.service';
import { Contact } from '../../core/contact/contact';
import { ContactAction } from '../../core/contact/contact-action';
import { ContactHoliday } from 'app/core/holiday/contact-holiday/contact-holiday';
import { PublicHoliday } from 'app/core/holiday/public-holiday/public-holiday';
import { PublicHolidayAction } from '../../core/holiday/public-holiday/public-holiday-action';
import { ContactHolidayAction } from '../../core/holiday/contact-holiday/contact-holiday-action';
import { DayItem } from '../../kalendar/day-item';

@Component({
    selector: 'day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit, OnDestroy {

    public day: Day;
    private subscription: Subscription;

    public memoCriteriaSelected: MemoCriteria;
    public contactSelected: Contact;
    public contactHolidaySelected: ContactHoliday;
    public publicHolidaySelected: PublicHoliday;

    public isContactSelected: boolean;
    public isMemoSelected: boolean;
    public isContactHolidaySelected: boolean;
    public isPublicHolidaySelected: boolean;

    constructor(
        private route: ActivatedRoute,
        private appService: AppService,
        private coreFacade: CoreFacade,
        private dateUtilService: DateUtilService
    ) {
        this.isMemoSelected = true;
        this.subscription = this.appService.date.subscribe(d => {
            this.day = new Day(d, new Date());
            this.memoCriteriaSelected = new MemoCriteria(null, this.dateUtilService.toString(this.day.date), null);
            this.contactSelected = new Contact(null, null, null, null, this.dateUtilService.toString(this.day.date));
            this.contactHolidaySelected = new ContactHoliday(null, null, null, this.dateUtilService.toString(this.day.date));
            this.publicHolidaySelected = new PublicHoliday(null, null, this.dateUtilService.toString(this.day.date));
            const days: Day[] = [];
            days.push(this.day);
            this.coreFacade.populateDays(days);
        })
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const selectedDate: Date = new Date(params['date']);
            this.appService.selectDate(selectedDate);
        });
    }

    ngOnDestroy(): void {
        // unsubscribe to ensure no memory leaks
        console.log('DayViewComponent ngOnDestroy', this.appService.currentDate);
        this.subscription.unsubscribe();
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
            this.contactSelected = new Contact(null, event.principalItem, event.additionalItem, null, this.dateUtilService.toString(this.day.date));
            this.contactSelected['$key'] = event.key;
        } else if (event.isMemo()) {
            this.editMemos();
            this.memoCriteriaSelected = new MemoCriteria(event.principalItem, this.dateUtilService.toString(this.day.date), event.key);
        } else if (event.isContactHoliday()) {
            this.editContactHolidays();
            this.contactHolidaySelected = new ContactHoliday(null, null, event.principalItem, this.dateUtilService.toString(this.day.date));
            this.contactHolidaySelected['$key'] = event.key;
        } else if (event.isPublicHoliday()) {
            this.editPublicHolidays();
            this.publicHolidaySelected = new PublicHoliday(null, event.principalItem, this.dateUtilService.toString(this.day.date));
            this.publicHolidaySelected['$key'] = event.key;
        }
    }

    doActionOnMemo(event: MemoCriteria) {
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
