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
    @Input() publicHoliday: PublicHoliday;
    private publicHolidayKey: string;

    public formItemGroup: FormGroup;
    @Input() publicHolidayIem: PublicHolidayItem;

    constructor() { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            year: new FormControl('', Validators.required)
        });
        this.formGroup.valueChanges.subscribe(data => {
            this.publicHoliday = data
        })

        this.formItemGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required)
        });
        this.formItemGroup.valueChanges.subscribe(data => {
            this.publicHolidayIem = data
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.publicHoliday && changes.publicHoliday.currentValue !== undefined) {
            this.publicHolidayKey = changes.publicHoliday.currentValue['$key']
            this.publicHoliday = changes.publicHoliday.currentValue;
            this.formGroup.setValue({
                'year': this.publicHoliday.year
            });
            this.formItemGroup.reset();
            this.publicHolidayIem = undefined;
        }
        if (changes.publicHolidayIem && changes.publicHolidayIem.currentValue !== undefined) {
            this.publicHolidayIem = changes.publicHolidayIem.currentValue;
            this.formItemGroup.setValue({
                'description': this.publicHolidayIem.description,
                'date': this.dateStringPipe.transform(this.publicHolidayIem.date)
            });
            this.formGroup.reset();
            this.publicHoliday = undefined;
        }
    }

    add() {
        let publicHolidayAction: PublicHolidayAction;
        if (this.publicHolidayKey === undefined) {
            publicHolidayAction = new PublicHolidayAction(Action.INSERT, this.publicHoliday);
        } else {
            publicHolidayAction = new PublicHolidayAction(Action.UPDATE, this.publicHoliday);
            publicHolidayAction.holidayKey = this.publicHolidayKey;
        }
        this.actionClick.emit(publicHolidayAction);
        this.publicHolidayKey = undefined;
        this.formGroup.reset();
    }

    delete() {
        let publicHolidayAction: PublicHolidayAction;
        if (this.publicHolidayKey !== undefined) {
            publicHolidayAction = new PublicHolidayAction(Action.DELETE);
            publicHolidayAction.holidayKey = this.publicHolidayKey;
            this.actionClick.emit(publicHolidayAction);
            this.publicHolidayKey = undefined;
            this.formGroup.reset();
        }
    }

    addItem() {
        let publicHolidayAction: PublicHolidayAction;
        // this.publicHoliday.items.push(this.publicHolidayIem);
        publicHolidayAction = new PublicHolidayAction(Action.UPDATE, this.publicHoliday, this.publicHolidayIem);
        publicHolidayAction.holidayKey = this.publicHolidayKey;

        this.actionClick.emit(publicHolidayAction);
        this.publicHolidayKey = undefined;
        this.formItemGroup.reset();
    }

    deleteItem() {
        console.log('deleteItem')
    }

}
