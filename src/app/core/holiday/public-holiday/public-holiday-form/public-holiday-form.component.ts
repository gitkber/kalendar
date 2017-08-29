import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicHoliday } from '../public-holiday';
import { PublicHolidayAction } from '../public-holiday-action';
import { Action } from '../../../action';
import { DateStringPipe } from '../../../../common/utils/date-string.pipe';

@Component({
    selector: 'public-holiday-form',
    templateUrl: './public-holiday-form.component.html',
    styleUrls: ['./public-holiday-form.component.css']
})
export class PublicHolidayFormComponent implements OnInit, OnChanges {

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    @Output() actionClick = new EventEmitter<PublicHolidayAction>();

    public formGroup: FormGroup;

    @Input() publicHoliday: PublicHoliday;
    private publicHolidayKey: string;

    constructor() { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.publicHoliday && changes.publicHoliday.currentValue !== undefined) {
            this.publicHolidayKey = changes.publicHoliday.currentValue['$key'];
            this.publicHoliday = changes.publicHoliday.currentValue;
            this.formGroup.setValue({
                'description': this.publicHoliday.description,
                'date': this.dateStringPipe.transform(this.publicHoliday.date)
            });
        }
    }

    addHoliday() {
        this.publicHoliday = this.formGroup.getRawValue();
        this.publicHoliday.date = this.dateStringPipe.transform(this.publicHoliday.date, true);

        let publicHolidayAction: PublicHolidayAction;
        if (this.publicHolidayKey === undefined) {
            publicHolidayAction = new PublicHolidayAction(Action.INSERT, this.publicHoliday);
        } else {
            publicHolidayAction = new PublicHolidayAction(Action.UPDATE, this.publicHoliday);
            publicHolidayAction.holidayKey = this.publicHolidayKey;
        }
        this.actionClickEmitAndResetFormGroup(publicHolidayAction);
    }

    deleteHoliday() {
        let publicHolidayAction: PublicHolidayAction;
        if (this.publicHolidayKey !== undefined) {
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

}
