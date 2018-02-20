import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { isUndefined } from 'util';
import { Holiday, HolidayAction } from '../holiday';
import { HolidayService } from '../holiday.service';
import { TagHolidayType } from '../../../common/utils/tag';

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

    public holidayTypes: string[] = [];

    constructor(private holidayService: HolidayService) {
        this.holidayTypes = Object.keys(TagHolidayType);

        this.formGroup = new FormGroup({
            tagType: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        });
    }

    getImage(holidayType: string): string {
        return 'fa fa-adn';
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.holiday && changes.holiday.currentValue) {
            this.holidayKey = changes.holiday.currentValue['$key'];
            this.formGroup.setValue({
                'tagType': changes.holiday.currentValue['$value'] !== null ? this.holiday.tagType : '',
                'description': changes.holiday.currentValue['$value'] !== null ? this.holiday.description : ''
            });
        }
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

    private actionClickEmitAndResetFormGroup(holidayAction: HolidayAction) {
        this.holidayService.doActionOnHoliday(holidayAction);
        this.close();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.holidayKey) || this.holidayKey === null;
    }
}
