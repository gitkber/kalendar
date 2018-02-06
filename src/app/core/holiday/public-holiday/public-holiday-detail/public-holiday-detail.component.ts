import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicHoliday, PublicHolidayAction } from '../public-holiday';
import { Action } from '../../../action';
import { isUndefined } from 'util';

@Component({
    selector: 'public-holiday-detail',
    templateUrl: './public-holiday-detail.component.html',
    styleUrls: ['./public-holiday-detail.component.css']
})
export class PublicHolidayDetailComponent implements OnChanges {

    @Input() publicHoliday: PublicHoliday;
    @Output() actionClick = new EventEmitter<PublicHolidayAction>();

    public formGroup: FormGroup;
    private publicHolidayKey: string;

    constructor() {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.publicHoliday && changes.publicHoliday.currentValue) {
            this.publicHolidayKey = changes.publicHoliday.currentValue['$key'];
            this.formGroup.setValue({
                'description': changes.publicHoliday.currentValue['$value'] !== null ? this.publicHoliday.description : ''
            });
        }
    }

    saveHoliday() {
        if (!this.formGroup.valid) {
            console.log('invalid');
            this.formGroup.get('description').markAsTouched();
        } else {
            this.publicHoliday.description = this.formGroup.get('description').value;

            let publicHolidayAction: PublicHolidayAction;
            if (this.isEmptyKey()) {
                publicHolidayAction = new PublicHolidayAction(Action.INSERT, this.publicHoliday);
            } else {
                publicHolidayAction = new PublicHolidayAction(Action.UPDATE, this.publicHoliday);
                publicHolidayAction.holidayKey = this.publicHolidayKey;
            }
            this.actionClickEmitAndResetFormGroup(publicHolidayAction);
        }
    }

    deleteHoliday() {
        if (!this.isEmptyKey()) {
            let publicHolidayAction = new PublicHolidayAction(Action.DELETE);
            publicHolidayAction.holidayKey = this.publicHolidayKey;
            this.actionClickEmitAndResetFormGroup(publicHolidayAction);
        }
    }

    private actionClickEmitAndResetFormGroup(publicHolidayAction: PublicHolidayAction) {
        this.actionClick.emit(publicHolidayAction);
        this.publicHolidayKey = undefined;
        this.formGroup.reset();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.publicHolidayKey) || this.publicHolidayKey === null;
    }
}
