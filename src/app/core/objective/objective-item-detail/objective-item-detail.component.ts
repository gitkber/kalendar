import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { isUndefined } from 'util';
import { ObjectiveItem, ObjectiveItemAction } from '../objective';
import { ObjectiveService } from '../objective.service';

@Component({
    selector: 'objective-item-detail',
    templateUrl: './objective-item-detail.component.html',
    styleUrls: ['./objective-item-detail.component.css']
})
export class ObjectiveItemDetailComponent implements OnChanges {

    @Input() objectiveKey;
    @Input() objectiveItem: ObjectiveItem;
    @Output() closeClick = new EventEmitter();

    public formGroup: FormGroup;
    public objectiveItemKey: string;

    constructor(private objectiveService: ObjectiveService) {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.objectiveItem && changes.objectiveItem.currentValue) {
            this.objectiveItemKey = changes.objectiveItem.currentValue['$key'];
            this.formGroup.setValue({
                'description': changes.objectiveItem.currentValue['$value'] !== null ? this.objectiveItem.description : ''
            });
        }
    }

    saveObjective() {
        if (!this.formGroup.valid) {
            this.formGroup.get('description').markAsTouched();
        } else {
            this.objectiveItem.description = this.formGroup.get('description').value;

            let objectiveItemAction: ObjectiveItemAction;
            if (this.isEmptyKey()) {
                objectiveItemAction = new ObjectiveItemAction(Action.INSERT, this.objectiveKey, this.objectiveItem);
            } else {
                objectiveItemAction = new ObjectiveItemAction(Action.UPDATE, this.objectiveKey, this.objectiveItem);
                objectiveItemAction.key = this.objectiveItemKey;
            }
            this.actionClickEmitAndResetFormGroup(objectiveItemAction);
        }
    }

    deleteObjective() {
        if (!this.isEmptyKey()) {
            const objectiveItemAction = new ObjectiveItemAction(Action.DELETE, this.objectiveKey);
            objectiveItemAction.key = this.objectiveItemKey;
            this.actionClickEmitAndResetFormGroup(objectiveItemAction);
        }
    }

    close() {
        this.closeClick.emit();
        this.formGroup.reset();
    }

    private actionClickEmitAndResetFormGroup(objectiveItemAction: ObjectiveItemAction) {
        this.objectiveService.doActionOnObjectiveItem(objectiveItemAction);
        this.close();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.objectiveItemKey) || this.objectiveItemKey === null;
    }
}
