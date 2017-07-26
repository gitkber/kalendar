import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Line } from '../../line/line';
import { LineAction } from '../line-action';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/pipe/date-string.pipe';

@Component({
    selector: 'line-form',
    templateUrl: 'line-form.component.html',
    styleUrls: ['./line-form.component.css']
})
export class LineFormComponent implements OnChanges, OnInit {

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    @Output() actionClick = new EventEmitter<LineAction>();
    public lineFormGroup: FormGroup;

    @Input() line: Line;
    private lineKey: string;

    constructor() { }

    ngOnInit() {
        this.lineFormGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            kalendarDate: new FormControl('', Validators.required)
        });
        this.lineFormGroup.valueChanges.subscribe(data => {
            this.line = data
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.line.currentValue !== undefined) {
            this.lineKey = changes.line.currentValue['$key']
            this.line = changes.line.currentValue;
            this.lineFormGroup.setValue({
                'description': this.line.description,
                'kalendarDate': this.dateStringPipe.transform(this.line.kalendarDate)
            });
        }
    }

    addLine() {
        this.line.kalendarDate = this.dateStringPipe.transform(this.line.kalendarDate, true);

        let lineAction: LineAction;
        if (this.lineKey === undefined) {
            lineAction = new LineAction(Action.INSERT, this.line);
        } else {
            lineAction = new LineAction(Action.UPDATE, this.line);
            lineAction.lineKey = this.lineKey;
        }
        this.actionClick.emit(lineAction);
        this.lineKey = undefined;
        this.lineFormGroup.reset();
    }

    deleteLine() {
        let lineAction: LineAction;
        if (this.lineKey !== undefined) {
            lineAction = new LineAction(Action.DELETE);
            lineAction.lineKey = this.lineKey;
            this.actionClick.emit(lineAction);
            this.lineKey = undefined;
            this.lineFormGroup.reset();
        }
    }
}
