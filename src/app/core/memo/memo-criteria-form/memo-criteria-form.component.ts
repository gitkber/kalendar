import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { Action } from '../../action';
import { MemoCriteria } from '../memo-criteria';

@Component({
    selector: 'memo-criteria-form',
    templateUrl: './memo-criteria-form.component.html',
    styleUrls: ['./memo-criteria-form.component.css']
})
export class MemoCriteriaFormComponent implements OnChanges {

    @ViewChild('inputDescription') input: ElementRef;

    @Input() memoCriteria: MemoCriteria;
    @Output() actionClick = new EventEmitter<MemoCriteria>();

    private dateStringPipe: DateStringPipe = new DateStringPipe();
    public memoCriteriaFormGroup: FormGroup;

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
                this.input.nativeElement.focus();
            }

            this.memoCriteria = changes.memoCriteria.currentValue;
            this.initFormGroup();
        }
    }

    private initFormGroup() {
        this.memoCriteriaFormGroup.setValue({
            'description': this.memoCriteria.description,
            'kalendarDate': this.dateStringPipe.transform(this.memoCriteria.kalendarDate),
            'duplication': this.memoCriteria.duplication,
            'includeWeekend': this.memoCriteria.includeWeekend,
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
