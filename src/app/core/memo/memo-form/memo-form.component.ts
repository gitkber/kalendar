import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { Memo, MemoAction } from '../memo';
import { isUndefined } from 'util';

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
    public kalendarDate: Date;
    public toKalendarDate: Date;
    private memoKey: string;

    private datesToAdd: Date[] = [];

    constructor() {
        this.memoCriteriaFormGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            duplication: new FormControl(),
            includeWeekend: new FormControl()
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.inputDescription.nativeElement.focus();

        if (changes.memo.currentValue !== undefined) {
            this.memoKey = changes.memo.currentValue['$key'];
            if (this.isEmptyKey()) {
                this.title = 'Ajouter un événement';
            } else {
                this.title = 'Modifier cet événement';
            }
            this.kalendarDate = new Date(this.memo.kalendarDate);
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
        this.toKalendarDate = startDate;
    }

    private initFormGroup() {
        this.changeSwitchToKalendarDate();
        this.memoCriteriaFormGroup.setValue({
            'description': this.memo.description,
            'duplication': 0,
            'includeWeekend': false
        });
    }

    saveMemo() {
        this.memo.description = this.memoCriteriaFormGroup.get('description').value;
        let memoAction: MemoAction;
        if (this.isEmptyKey()) {
            memoAction = new MemoAction(Action.INSERT, this.memo);
        } else {
            memoAction = new MemoAction(Action.UPDATE, this.memo);
            memoAction.memoKey = this.memoKey;
        }
        memoAction.datesToAdd = this.datesToAdd;
        this.actionClickEmitAndResetFormGroup(memoAction);
    }

    deleteMemo() {
        if (!this.isEmptyKey()) {
            const memoAction: MemoAction = new MemoAction(Action.DELETE);
            memoAction.memoKey = this.memoKey;
            this.actionClickEmitAndResetFormGroup(memoAction);
        }
    }

    private actionClickEmitAndResetFormGroup(memoAction: MemoAction) {
        this.actionClick.emit(memoAction);

        this.memoCriteriaFormGroup.reset();
        this.memo = new Memo(null, null, this.memo.kalendarDate);
        this.kalendarDate = new Date(this.memo.kalendarDate);
        this.initFormGroup();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.memoKey) || this.memoKey === null;
    }
}
