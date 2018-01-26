import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactHoliday, ContactHolidayAction } from '../contact-holiday';
import { Action } from '../../../action';
import { isUndefined } from 'util';

@Component({
    selector: 'contact-holiday-form',
    templateUrl: './contact-holiday-form.component.html',
    styleUrls: ['./contact-holiday-form.component.css']
})
export class ContactHolidayFormComponent implements OnChanges {

    @Input() contactHoliday: ContactHoliday;
    @Output() actionClick = new EventEmitter<ContactHolidayAction>();

    public title: string;
    public formGroup: FormGroup;
    private contactHolidayKey: string;

    constructor() {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.contactHoliday && changes.contactHoliday.currentValue !== undefined) {
            this.contactHolidayKey = changes.contactHoliday.currentValue['$key'];
            this.contactHoliday = changes.contactHoliday.currentValue;
            if (this.isEmptyKey()) {
                this.title = 'Ajouter un jour de congé';
            } else {
                this.title = 'Modifier ce jour de congé';
            }

            this.formGroup.setValue({
                'description': this.contactHoliday.description
            });
        }
    }

    addHoliday() {
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

    deleteHoliday() {
        let contactHolidayAction: ContactHolidayAction;
        if (!this.isEmptyKey()) {
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

    private isEmptyKey(): boolean {
        return isUndefined(this.contactHolidayKey) || this.contactHolidayKey === null;
    }
}
