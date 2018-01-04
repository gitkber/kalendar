import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { DateUtilService } from '../../../common/utils/date-util.service';
import { isUndefined } from 'util';
import { Objective, ObjectiveAction } from '../objective';

@Component({
    selector: 'objective-form',
    templateUrl: 'objective-form.component.html',
    styleUrls: ['./objective-form.component.css']
})
export class ObjectiveFormComponent implements OnChanges {

    @Input() objective: Objective;
    @Output() actionClick = new EventEmitter<ObjectiveAction>();

    public title: string;
    public objectiveFormGroup: FormGroup;
    private objectiveKey: string;

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    constructor(public dateUtilService: DateUtilService) {
        this.objectiveFormGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            tags: new FormControl('', Validators.required)
            // deadline: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.objective.currentValue !== undefined) {
            this.objectiveKey = changes.objective.currentValue['$key'];
            if (this.isEmptyKey()) {
                this.title = 'Ajouter';
            } else {
                this.title = 'Modifier';
            }
            this.objectiveFormGroup.setValue({
                'description': this.objective.description,
                'tags': this.objective.tags
                // 'deadline': this.dateStringPipe.transform(this.catchAll.deadline)
            });
        }
    }

    addObjective() {
        // this.objective.tagCase = this.objectiveFormGroup.get('tagCase').value;
        // this.objective.tagCaseType = this.objectiveFormGroup.get('tagCaseType').value;
        this.objective.description = this.objectiveFormGroup.get('description').value;
        // this.catchAll.deadline = this.dateStringPipe.transform(this.objectiveFormGroup.get('deadline').value, true);

        let objectiveAction: ObjectiveAction;
        if (this.isEmptyKey()) {
            objectiveAction = new ObjectiveAction(Action.INSERT, this.objective);
        } else {
            objectiveAction = new ObjectiveAction(Action.UPDATE, this.objective);
            objectiveAction.key = this.objectiveKey;
        }
        this.actionClickEmitAndResetFormGroup(objectiveAction);
    }

    deleteOjective() {
        if (!this.isEmptyKey()) {
            const objectiveAction: ObjectiveAction = new ObjectiveAction(Action.DELETE);
            objectiveAction.key = this.objectiveKey;
            this.actionClickEmitAndResetFormGroup(objectiveAction);
        }
    }

    private actionClickEmitAndResetFormGroup(objectiveAction: ObjectiveAction) {
        this.actionClick.emit(objectiveAction);
        this.objectiveKey = undefined;
        this.objectiveFormGroup.reset();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.objectiveKey) || this.objectiveKey === null;
    }
}
