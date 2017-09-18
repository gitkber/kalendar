import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactHoliday } from '../contact-holiday';
import { ContactHolidayAction } from '../contact-holiday-action';
import { Action } from '../../../action';
import { DateStringPipe } from '../../../../common/utils/date-string.pipe';

@Component({
    selector: 'contact-holiday-form',
    templateUrl: './contact-holiday-form.component.html',
    styleUrls: ['./contact-holiday-form.component.css']
})
export class ContactHolidayFormComponent implements OnChanges {

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    @Output() actionClick = new EventEmitter<ContactHolidayAction>();

    public formGroup: FormGroup;

    @Input() contactHoliday: ContactHoliday;
    private contactHolidayKey: string;

    constructor() {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.contactHoliday && changes.contactHoliday.currentValue !== undefined) {
            this.contactHolidayKey = changes.contactHoliday.currentValue['$key'];
            this.contactHoliday = changes.contactHoliday.currentValue;
            this.formGroup.setValue({
                'description': this.contactHoliday.description,
                'date': this.dateStringPipe.transform(this.contactHoliday.date)
            });
        }
    }

    addHoliday() {
        this.contactHoliday = this.formGroup.getRawValue();
        this.contactHoliday.date = this.dateStringPipe.transform(this.contactHoliday.date, true);

        let contactHolidayAction: ContactHolidayAction;
        if (this.contactHolidayKey === undefined) {
            contactHolidayAction = new ContactHolidayAction(Action.INSERT, this.contactHoliday);
        } else {
            contactHolidayAction = new ContactHolidayAction(Action.UPDATE, this.contactHoliday);
            contactHolidayAction.holidayKey = this.contactHolidayKey;
        }
        this.actionClickEmitAndResetFormGroup(contactHolidayAction);
    }

    deleteHoliday() {
        let contactHolidayAction: ContactHolidayAction;
        if (this.contactHolidayKey !== undefined) {
            contactHolidayAction = new ContactHolidayAction(Action.DELETE);
            contactHolidayAction.holidayKey = this.contactHolidayKey;
            this.actionClickEmitAndResetFormGroup(contactHolidayAction);
        }
    }

    private actionClickEmitAndResetFormGroup(contactHolidayAction: ContactHolidayAction) {
        this.actionClick.emit(contactHolidayAction);
        this.contactHolidayKey = undefined;
        this.formGroup.reset();
    }

}
