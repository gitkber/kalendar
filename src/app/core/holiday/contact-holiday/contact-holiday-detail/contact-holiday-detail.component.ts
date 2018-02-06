import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactHoliday, ContactHolidayAction } from '../contact-holiday';
import { Action } from '../../../action';
import { isUndefined } from 'util';

@Component({
    selector: 'contact-holiday-detail',
    templateUrl: './contact-holiday-detail.component.html',
    styleUrls: ['./contact-holiday-detail.component.css']
})
export class ContactHolidayDetailComponent implements OnChanges {

    @Input() contactHoliday: ContactHoliday;
    @Output() actionClick = new EventEmitter<ContactHolidayAction>();

    public formGroup: FormGroup;
    private contactHolidayKey: string;

    constructor() {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.contactHoliday && changes.contactHoliday.currentValue) {
            this.contactHolidayKey = changes.contactHoliday.currentValue['$key'];
            this.formGroup.setValue({
                'description': changes.contactHoliday.currentValue['$value'] !== null ? this.contactHoliday.description : ''
            });
        }
    }

    saveHoliday() {
        if (!this.formGroup.valid) {
            console.log('invalid');
            this.formGroup.get('description').markAsTouched();
        } else {
            this.contactHoliday.description = this.formGroup.get('description').value;

            let contactHolidayAction: ContactHolidayAction;
            if (this.isEmptyKey()) {
                contactHolidayAction = new ContactHolidayAction(Action.INSERT, this.contactHoliday);
            } else {
                contactHolidayAction = new ContactHolidayAction(Action.UPDATE, this.contactHoliday);
                contactHolidayAction.holidayKey = this.contactHolidayKey;
            }
            this.actionClickEmitAndResetFormGroup(contactHolidayAction);
        }
    }

    deleteHoliday() {
        if (!this.isEmptyKey()) {
            let contactHolidayAction = new ContactHolidayAction(Action.DELETE);
            contactHolidayAction.holidayKey = this.contactHolidayKey;
            this.actionClickEmitAndResetFormGroup(contactHolidayAction);
        }
    }

    private actionClickEmitAndResetFormGroup(contactHolidayAction: ContactHolidayAction) {
        this.actionClick.emit(contactHolidayAction);
        this.contactHolidayKey = undefined;
        this.formGroup.reset();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.contactHolidayKey) || this.contactHolidayKey === null;
    }
}
