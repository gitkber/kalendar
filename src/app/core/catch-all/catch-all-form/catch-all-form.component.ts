import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { DateUtilService } from '../../../common/utils/date-util.service';
import { isUndefined } from 'util';
import { CatchAll, CatchAllAction } from '../catch-all';

@Component({
    selector: 'catch-all-form',
    templateUrl: 'catch-all-form.component.html',
    styleUrls: ['./catch-all-form.component.css']
})
export class CatchAllFormComponent implements OnChanges {

    @Input() catchAll: CatchAll;
    @Output() actionClick = new EventEmitter<CatchAllAction>();

    public title: string;
    public catchAllFormGroup: FormGroup;
    private catchAllKey: string;

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    constructor(public dateUtilService: DateUtilService) {
        this.catchAllFormGroup = new FormGroup({
            tagCase: new FormControl('', Validators.required),
            tagCaseType: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
            // deadline: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.catchAll.currentValue !== undefined) {
            this.catchAllKey = changes.catchAll.currentValue['$key'];
            if (this.isEmptyKey()) {
                this.title = 'Ajouter un catchAll';
            } else {
                this.title = 'Modifier ce catchAll';
            }
            this.catchAllFormGroup.setValue({
                'tagCase': this.catchAll.tagCase,
                'tagCaseType': this.catchAll.tagCaseType,
                'description': this.catchAll.description
                // 'deadline': this.dateStringPipe.transform(this.catchAll.deadline)
            });
        }
    }

    addCatchAll() {
        this.catchAll.tagCase = this.catchAllFormGroup.get('tagCase').value;
        this.catchAll.tagCaseType = this.catchAllFormGroup.get('tagCaseType').value;
        // this.catchAll.deadline = this.dateStringPipe.transform(this.catchAllFormGroup.get('deadline').value, true);

        let catchAllAction: CatchAllAction;
        if (this.isEmptyKey()) {
            catchAllAction = new CatchAllAction(Action.INSERT, this.catchAll);
        } else {
            catchAllAction = new CatchAllAction(Action.UPDATE, this.catchAll);
            catchAllAction.key = this.catchAllKey;
        }
        this.actionClickEmitAndResetFormGroup(catchAllAction);
    }

    deleteCatchAll() {
        if (!this.isEmptyKey()) {
            const catchAllAction: CatchAllAction = new CatchAllAction(Action.DELETE);
            catchAllAction.key = this.catchAllKey;
            this.actionClickEmitAndResetFormGroup(catchAllAction);
        }
    }

    private actionClickEmitAndResetFormGroup(catchAllAction: CatchAllAction) {
        this.actionClick.emit(catchAllAction);
        this.catchAllKey = undefined;
        this.catchAllFormGroup.reset();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.catchAllKey) || this.catchAllKey === null;
    }
}
