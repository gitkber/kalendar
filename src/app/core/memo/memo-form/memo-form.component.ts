import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { Action } from '../../action';
import { MemoAction } from '../memo-action';
import { isUndefined } from 'util';
import { Memo } from '../memo';

@Component({
    selector: 'memo-form',
    templateUrl: './memo-form.component.html',
    styleUrls: ['./memo-form.component.css']
})
export class MemoFormComponent implements OnChanges {

    @ViewChild('inputDescription') inputDescription: ElementRef;

    @Input() memo: Memo;
    @Output() actionClick = new EventEmitter<MemoAction>();

    public title: string;
    public memoCriteriaFormGroup: FormGroup;
    private memoKey: string;

    private dateStringPipe: DateStringPipe = new DateStringPipe();
    private datesToAdd: Date[] = [];

    constructor() {
        this.memoCriteriaFormGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            kalendarDate: new FormControl('', Validators.required),
            toKalendarDate: new FormControl('', Validators.required),
            duplication: new FormControl(),
            includeWeekend: new FormControl()
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.memo.currentValue !== undefined) {
            if (changes.memo.currentValue.description === null) {
                this.inputDescription.nativeElement.focus();
            }
            this.memoKey = changes.memo.currentValue['$key'];
            if (this.isEmptyKey()) {
                this.title = 'Ajouter un événement';
            } else {
                this.title = 'Modifier cet événement';
            }
            this.initFormGroup();
        }
    }

    changeSwitchToKalendarDate() {
        this.changeToKalendarDate(parseInt(this.memoCriteriaFormGroup.get('duplication').value, 10),
            !this.memoCriteriaFormGroup.get('includeWeekend').value);
    }

    changeDuplicationToKalendarDate(event) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.changeToKalendarDate(parseInt(event.target.value, 10), this.memoCriteriaFormGroup.get('includeWeekend').value);
    }

    private changeToKalendarDate(duplication: number, includeWeekend: boolean) {
        // console.log('duplication', duplication + ' ' + includeWeekend);

        const startDate: Date = new Date(this.memo.kalendarDate);
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
        this.memoCriteriaFormGroup.get('toKalendarDate').setValue(startDate);
        // console.log('test datesToAdd.length', this.memoCriteria.datesToAdd.length);
        // console.log('test datesToAdd', this.memoCriteria.datesToAdd);
    }

    private initFormGroup() {
        this.memoCriteriaFormGroup.setValue({
            'description': this.memo.description,
            'kalendarDate': this.dateStringPipe.transform(this.memo.kalendarDate),
            'toKalendarDate': this.dateStringPipe.transform(this.memo.kalendarDate),
            'duplication': 0,
            'includeWeekend': false
        });
    }

    saveMemo() {
        // this.memoCriteria = this.memoCriteriaFormGroup.getRawValue();

        // this.memoCriteria.kalendarDate = this.dateStringPipe.transform(this.memoCriteria.kalendarDate, true);
        this.memo.description = this.memoCriteriaFormGroup.get('description').value;
        let memoCriteria: MemoAction;
        if (this.isEmptyKey()) {
            memoCriteria = new MemoAction(Action.INSERT, this.memo);
        } else {
            memoCriteria = new MemoAction(Action.UPDATE, this.memo);
            memoCriteria.memoKey = this.memoKey;
        }
        memoCriteria.datesToAdd = this.datesToAdd;
        this.actionClickEmitAndResetFormGroup(memoCriteria);
    }

    deleteMemo() {
        if (!this.isEmptyKey()) {
            const memoCriteria: MemoAction = new MemoAction(Action.DELETE);
            memoCriteria.memoKey = this.memoKey;
            this.actionClickEmitAndResetFormGroup(memoCriteria);
        }
    }

    private actionClickEmitAndResetFormGroup(memoCriteria: MemoAction) {
        console.log('criteria', memoCriteria);
        this.actionClick.emit(memoCriteria);

        this.memoCriteriaFormGroup.reset();
        this.memo = new Memo(null, null, this.memo.kalendarDate);
        this.initFormGroup();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.memoKey) || this.memoKey === null;
    }
}
