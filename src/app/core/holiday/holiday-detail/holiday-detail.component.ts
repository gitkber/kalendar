import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { isUndefined } from 'util';
import { Holiday, HolidayAction } from '../holiday';
import { HolidayService } from '../holiday.service';
import { getTagHolidayTypeImage, TagHolidayType } from '../../../common/utils/tag';

@Component({
    selector: 'holiday-detail',
    templateUrl: './holiday-detail.component.html',
    styleUrls: ['./holiday-detail.component.css']
})
export class HolidayDetailComponent implements OnChanges {

    @Input() holiday: Holiday;
    @Output() closeClick = new EventEmitter();

    public formGroup: FormGroup;
    public holidayKey: string;

    public toKalendarDate: Date;
    private datesToAdd: Date[] = [];

    public holidayTypes: string[] = [];

    constructor(private holidayService: HolidayService) {
        this.holidayTypes = Object.keys(TagHolidayType);

        this.formGroup = new FormGroup({
            tagType: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            duplication: new FormControl('', Validators.pattern('[0-9]')),
            includeWeekend: new FormControl()
        });
    }

    getImage(holidayType: string): string {
        return getTagHolidayTypeImage(holidayType);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.holiday && changes.holiday.currentValue) {
            this.holidayKey = changes.holiday.currentValue['$key'];

            this.changeSwitchToKalendarDate();
            this.formGroup.setValue({
                'tagType': changes.holiday.currentValue['$value'] !== null ? this.holiday.tagType : '',
                'description': changes.holiday.currentValue['$value'] !== null ? this.holiday.description : '',
                'duplication': '',
                'includeWeekend': false
            });
        }
    }

    changeSwitchToKalendarDate() {
        this.changeToKalendarDate(parseInt(this.formGroup.get('duplication').value, 10),
            !this.formGroup.get('includeWeekend').value);
    }

    changeDuplicationToKalendarDate(event) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.changeToKalendarDate(parseInt(event.target.value, 10), this.formGroup.get('includeWeekend').value);
    }

    saveHoliday() {
        if (!this.formGroup.valid) {
            console.log('invalid');
            this.formGroup.get('description').markAsTouched();
        } else {
            this.holiday.tagType = this.formGroup.get('tagType').value;
            this.holiday.description = this.formGroup.get('description').value;

            let holidayAction: HolidayAction;
            if (this.isEmptyKey()) {
                holidayAction = new HolidayAction(Action.INSERT, this.holiday);
            } else {
                holidayAction = new HolidayAction(Action.UPDATE, this.holiday);
                holidayAction.key = this.holidayKey;
            }
            holidayAction.datesToAdd = this.datesToAdd;
            this.actionClickEmitAndResetFormGroup(holidayAction);
        }
    }

    deleteHoliday() {
        if (!this.isEmptyKey()) {
            const holidayAction = new HolidayAction(Action.DELETE);
            holidayAction.key = this.holidayKey;
            this.actionClickEmitAndResetFormGroup(holidayAction);
        }
    }

    close() {
        this.closeClick.emit();
        this.formGroup.reset();
    }

    private changeToKalendarDate(duplication: number, includeWeekend: boolean) {
        const startDate: Date = new Date(this.holiday.date);
        this.datesToAdd = [];
        this.datesToAdd.push(new Date(startDate));
        for (let i = 1; i <= duplication; i++) {
            startDate.setDate(startDate.getDate() + 1);
            if (!includeWeekend) {
                if (startDate.getDay() === 6) {
                    startDate.setDate(startDate.getDate() + 2);
                } else if (startDate.getDay() === 0) {
                    startDate.setDate(startDate.getDate() + 1);
                }
            }
            this.datesToAdd.push(new Date(startDate));
        }
        this.toKalendarDate = startDate;
    }

    private actionClickEmitAndResetFormGroup(holidayAction: HolidayAction) {
        this.holidayService.doActionOnHoliday(holidayAction);
        this.close();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.holidayKey) || this.holidayKey === null;
    }
}
