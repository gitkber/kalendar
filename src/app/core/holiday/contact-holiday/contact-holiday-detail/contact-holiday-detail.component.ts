import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactHoliday, ContactHolidayAction } from '../contact-holiday';
import { Action } from '../../../action';
import { isUndefined } from 'util';
import { ContactHolidayService } from '../contact-holiday.service';

@Component({
    selector: 'contact-holiday-detail',
    templateUrl: './contact-holiday-detail.component.html',
    styleUrls: ['./contact-holiday-detail.component.css']
})
export class ContactHolidayDetailComponent implements OnChanges {

    @Input() contactHoliday: ContactHoliday;
    @Output() closeClick = new EventEmitter();

    public formGroup: FormGroup;
    public contactHolidayKey: string;

    constructor(private contactHolidayService: ContactHolidayService) {
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
            const contactHolidayAction = new ContactHolidayAction(Action.DELETE);
            contactHolidayAction.holidayKey = this.contactHolidayKey;
            this.actionClickEmitAndResetFormGroup(contactHolidayAction);
        }
    }

    close() {
        this.closeClick.emit();
        this.formGroup.reset();
    }

    private actionClickEmitAndResetFormGroup(contactHolidayAction: ContactHolidayAction) {
        this.contactHolidayService.doActionOnContactHoliday(contactHolidayAction);
        this.close();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.contactHolidayKey) || this.contactHolidayKey === null;
    }
}
