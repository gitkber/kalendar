import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicHoliday, PublicHolidayItem } from '../public-holiday';
import { PublicHolidayAction } from '../public-holiday-action';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';

@Component({
    selector: 'public-holiday-form',
    templateUrl: './public-holiday-form.component.html',
    styleUrls: ['./public-holiday-form.component.css']
})
export class PublicHolidayFormComponent implements OnInit, OnChanges {

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    @Output() actionClick = new EventEmitter<PublicHolidayAction>();

    public formGroup: FormGroup;
    public itemSelected: boolean;

    @Input() publicHoliday: PublicHoliday;
    @Input() publicHolidayIem: PublicHolidayItem;

    private publicHolidayKey: string;
    private publicHolidayItemKey: string;
    
    

    constructor() { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            year: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.publicHoliday && changes.publicHoliday.currentValue !== undefined) {
            this.publicHolidayKey = changes.publicHoliday.currentValue['$key']
            this.publicHoliday = changes.publicHoliday.currentValue;
            this.formGroup.setValue({
                'year': this.publicHoliday.year,
                'description': '',
                'date': ''
            });
            this.itemSelected = false;
        }
        if (changes.publicHolidayIem && changes.publicHolidayIem.currentValue !== undefined) {
            this.publicHolidayItemKey = changes.publicHolidayIem.currentValue['$key']
            this.publicHolidayIem = changes.publicHolidayIem.currentValue;
            this.formGroup.setValue({
                'year': '',
                'description': this.publicHolidayIem.description,
                'date': this.dateStringPipe.transform(this.publicHolidayIem.date)
            });
            this.itemSelected = true;
        }
    }

    add() {
        console.log('', this.formGroup.getRawValue());
        let publicHolidayAction: PublicHolidayAction;
        if (this.itemSelected) {
            if (this.publicHolidayItemKey === undefined) {
                publicHolidayAction = new PublicHolidayAction(Action.INSERT, this.publicHoliday, this.publicHolidayIem);
            } else {
                publicHolidayAction = new PublicHolidayAction(Action.UPDATE, this.publicHoliday, this.publicHolidayIem);
                publicHolidayAction.holidayKey = this.publicHolidayKey;
                publicHolidayAction.holidayItemKey = this.publicHolidayItemKey;
            }
        } else {
            if (this.publicHolidayKey === undefined) {
                publicHolidayAction = new PublicHolidayAction(Action.INSERT, this.publicHoliday);
            } else {
                publicHolidayAction = new PublicHolidayAction(Action.UPDATE, this.publicHoliday);
                publicHolidayAction.holidayKey = this.publicHolidayKey;
            }
        }
        this.actionClickEmitAndResetFormGroup(publicHolidayAction);
    }

    delete() {
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
        this.publicHolidayItemKey = undefined;
        this.formGroup.reset();
    }

}
