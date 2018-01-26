import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicHoliday, PublicHolidayAction } from '../public-holiday';
import { Action } from '../../../action';
import { isUndefined } from 'util';

@Component({
    selector: 'public-holiday-form',
    templateUrl: './public-holiday-form.component.html',
    styleUrls: ['./public-holiday-form.component.css']
})
export class PublicHolidayFormComponent implements OnChanges {

    @Input() publicHoliday: PublicHoliday;
    @Output() actionClick = new EventEmitter<PublicHolidayAction>();

    public title: string;
    public formGroup: FormGroup;
    private publicHolidayKey: string;

    constructor() {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.publicHoliday && changes.publicHoliday.currentValue !== undefined) {
            this.publicHolidayKey = changes.publicHoliday.currentValue['$key'];
            this.publicHoliday = changes.publicHoliday.currentValue;
            if (this.isEmptyKey()) {
                this.title = 'Ajouter un jour férié';
            } else {
                this.title = 'Modifier ce jour férié';
            }
            this.formGroup.setValue({
                'description': this.publicHoliday.description
            });
        }
    }

    addHoliday() {
        this.publicHoliday = this.formGroup.get('description').value;

        let publicHolidayAction: PublicHolidayAction;
        if (this.isEmptyKey()) {
            publicHolidayAction = new PublicHolidayAction(Action.INSERT, this.publicHoliday);
        } else {
            publicHolidayAction = new PublicHolidayAction(Action.UPDATE, this.publicHoliday);
            publicHolidayAction.holidayKey = this.publicHolidayKey;
        }
        this.actionClickEmitAndResetFormGroup(publicHolidayAction);
    }

    deleteHoliday() {
        let publicHolidayAction: PublicHolidayAction;
        if (!this.isEmptyKey()) {
            publicHolidayAction = new PublicHolidayAction(Action.DELETE);
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
