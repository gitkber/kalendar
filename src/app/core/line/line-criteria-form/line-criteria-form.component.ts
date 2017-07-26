import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateStringPipe } from '../../../common/pipe/date-string.pipe';
import { Action } from '../../action';
import { LineCriteria } from '../line-criteria';

@Component({
    selector: 'line-criteria-form',
    templateUrl: './line-criteria-form.component.html',
    styleUrls: ['./line-criteria-form.component.css']
})
export class LineCriteriaFormComponent implements OnInit, OnChanges {

    @Input() lineCriteria: LineCriteria;
    @Output() actionClick = new EventEmitter<LineCriteria>();

    private dateStringPipe: DateStringPipe = new DateStringPipe();
    public lineCriteriaFormGroup: FormGroup;

    constructor() { }

    ngOnInit() {
        this.lineCriteriaFormGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            kalendarDate: new FormControl('', Validators.required),
            duplication: new FormControl(),
            includeWeekend: new FormControl(),
            lineKey: new FormControl()
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.lineCriteria.currentValue !== undefined) {
            this.lineCriteria = changes.lineCriteria.currentValue;
            this.initFormGroup();
        }
    }

    private initFormGroup() {
        this.lineCriteriaFormGroup.setValue({
            'description': this.lineCriteria.description,
            'kalendarDate': this.dateStringPipe.transform(this.lineCriteria.kalendarDate),
            'duplication': this.lineCriteria.duplication,
            'includeWeekend': this.lineCriteria.includeWeekend,
            'lineKey': this.lineCriteria.lineKey
        });
    }

    saveLine() {
        this.lineCriteria = this.lineCriteriaFormGroup.getRawValue();
        this.lineCriteria.kalendarDate = this.dateStringPipe.transform(this.lineCriteria.kalendarDate, true);
        if (this.lineCriteria.lineKey === null) {
            this.lineCriteria.action = Action.INSERT;
        } else {
            this.lineCriteria.action = Action.UPDATE;
        }
        this.actionClickEmitAndResetFormGroup();
    }

    deleteLine() {
        if (this.lineCriteria.lineKey !== undefined) {
            this.lineCriteria.action = Action.DELETE;
            this.actionClickEmitAndResetFormGroup();
        }
    }

    private actionClickEmitAndResetFormGroup() {
        this.actionClick.emit(this.lineCriteria);

        const tempDate: string = this.lineCriteria.kalendarDate;
        this.lineCriteriaFormGroup.reset();
        this.lineCriteria = new LineCriteria(null, tempDate, null);
        this.initFormGroup();
    }

}
