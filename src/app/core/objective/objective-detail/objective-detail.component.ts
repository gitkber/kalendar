import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { isUndefined } from 'util';
import { Objective, ObjectiveAction } from '../objective';
import { ObjectiveService } from '../objective.service';

@Component({
    selector: 'objective-detail',
    templateUrl: './objective-detail.component.html',
    styleUrls: ['./objective-detail.component.css']
})
export class ObjectiveDetailComponent implements OnChanges {

    @Input() objective: Objective;
    @Output() closeClick = new EventEmitter();

    public formGroup: FormGroup;
    public objectiveKey: string;

    constructor(private objectiveService: ObjectiveService) {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.objective && changes.objective.currentValue) {
            this.objectiveKey = changes.objective.currentValue['$key'];
            this.formGroup.setValue({
                'description': changes.objective.currentValue['$value'] !== null ? this.objective.description : ''
            });
        }
    }

    saveObjective() {
        if (!this.formGroup.valid) {
            this.formGroup.get('description').markAsTouched();
        } else {
            this.objective.description = this.formGroup.get('description').value;

            let objectiveAction: ObjectiveAction;
            if (this.isEmptyKey()) {
                objectiveAction = new ObjectiveAction(Action.INSERT, this.objective);
            } else {
                objectiveAction = new ObjectiveAction(Action.UPDATE, this.objective);
                objectiveAction.key = this.objectiveKey;
            }
            this.actionClickEmitAndResetFormGroup(objectiveAction);
        }
    }

    deleteObjective() {
        if (!this.isEmptyKey()) {
            const objectiveAction = new ObjectiveAction(Action.DELETE);
            objectiveAction.key = this.objectiveKey;
            this.actionClickEmitAndResetFormGroup(objectiveAction);
        }
    }

    close() {
        this.closeClick.emit();
        this.formGroup.reset();
    }

    private actionClickEmitAndResetFormGroup(objectiveAction: ObjectiveAction) {
        this.objectiveService.doActionOnObjective(objectiveAction);
        this.close();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.objectiveKey) || this.objectiveKey === null;
    }
}
