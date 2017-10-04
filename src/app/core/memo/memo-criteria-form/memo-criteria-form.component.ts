import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { Action } from '../../action';
import { MemoCriteria } from '../memo-criteria';
import { isUndefined } from 'util';

@Component({
    selector: 'memo-criteria-form',
    templateUrl: './memo-criteria-form.component.html',
    styleUrls: ['./memo-criteria-form.component.css']
})
export class MemoCriteriaFormComponent implements OnChanges {

    @ViewChild('inputDescription') inputDescription: ElementRef;

    @Input() memoCriteria: MemoCriteria;
    @Output() actionClick = new EventEmitter<MemoCriteria>();

    public title: string;
    public memoCriteriaFormGroup: FormGroup;
    public toKalendarDate: Date;

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    constructor() {
        this.memoCriteriaFormGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            kalendarDate: new FormControl('', Validators.required),
            duplication: new FormControl(),
            includeWeekend: new FormControl(),
            memoKey: new FormControl()
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.memoCriteria.currentValue !== undefined) {
            if (changes.memoCriteria.currentValue.description === null) {
                this.inputDescription.nativeElement.focus();
            }
            this.toKalendarDate = new Date(this.memoCriteria.kalendarDate);
            this.memoCriteria = changes.memoCriteria.currentValue;
            if (this.memoCriteria.memoKey === null || isUndefined(this.memoCriteria.memoKey)) {
                this.title = 'Ajouter un événement';
            } else {
                this.title = 'Modifier cet événement';
            }
            this.initFormGroup();
        }
    }

    changeSwitchToKalendarDate() {
        this.changeToKalendarDate(parseInt(this.memoCriteriaFormGroup.get('duplication').value, 10),
            this.memoCriteriaFormGroup.get('includeWeekend').value);
    }

    changeDuplicationToKalendarDate(event) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.changeToKalendarDate(parseInt(event.target.value, 10), this.memoCriteriaFormGroup.get('includeWeekend').value);
    }

    private changeToKalendarDate(duplication: number, includeWeekend: boolean) {
        console.log('duplication', duplication + ' ' + includeWeekend);

        const startDate: Date = new Date(this.memoCriteria.kalendarDate);
        this.memoCriteria.datesToAdd = [];
        this.memoCriteria.datesToAdd.push(new Date(startDate));
        for (let i = 1; i <= duplication; i++) {
            startDate.setDate(startDate.getDate() + 1);
            if (!includeWeekend) {
                if (startDate.getDay() === 6) {
                    startDate.setDate(startDate.getDate() + 2);
                } else if (startDate.getDay() === 0) {
                    startDate.setDate(startDate.getDate() + 1);
                }
            }
            this.memoCriteria.datesToAdd.push(new Date(startDate));
        }
        this.toKalendarDate = startDate;
        console.log('test datesToAdd.length', this.memoCriteria.datesToAdd.length);
        console.log('test datesToAdd', this.memoCriteria.datesToAdd);
    }

    private initFormGroup() {
        this.memoCriteriaFormGroup.setValue({
            'description': this.memoCriteria.description,
            'kalendarDate': this.dateStringPipe.transform(this.memoCriteria.kalendarDate),
            'duplication': 0,
            'includeWeekend': false,
            'memoKey': this.memoCriteria.memoKey
        });
    }

    saveMemo() {
        this.memoCriteria = this.memoCriteriaFormGroup.getRawValue();
        this.memoCriteria.kalendarDate = this.dateStringPipe.transform(this.memoCriteria.kalendarDate, true);
        if (this.memoCriteria.memoKey === null) {
            this.memoCriteria.action = Action.INSERT;
        } else {
            this.memoCriteria.action = Action.UPDATE;
        }
        this.actionClickEmitAndResetFormGroup();
    }

    deleteMemo() {
        if (this.memoCriteria.memoKey !== undefined) {
            this.memoCriteria.action = Action.DELETE;
            this.actionClickEmitAndResetFormGroup();
        }
    }

    private actionClickEmitAndResetFormGroup() {
        this.actionClick.emit(this.memoCriteria);

        const tempDate: string = this.memoCriteria.kalendarDate;
        this.memoCriteriaFormGroup.reset();
        this.memoCriteria = new MemoCriteria(null, tempDate, null);
        this.initFormGroup();
    }

}
