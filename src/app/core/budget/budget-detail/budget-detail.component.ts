import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { isUndefined } from 'util';
import { Budget, BudgetAction } from '../budget';
import { getTagBudgetTypeImage, TagBudgetType } from '../../../common/utils/tag';
import { BudgetService } from '../budget.service';

@Component({
    selector: 'budget-detail',
    templateUrl: 'budget-detail.component.html',
    styleUrls: ['./budget-detail.component.css']
})
export class BudgetDetailComponent implements OnChanges {

    @Input() budget: Budget;
    @Output() closeClick = new EventEmitter();

    public formGroup: FormGroup;
    public budgetKey: string;

    public optionTypes: string[] = [];

    constructor(private budgetService: BudgetService) {
        this.optionTypes = Object.keys(TagBudgetType);

        this.formGroup = new FormGroup({
            tagType: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            amount: new FormControl('', [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})?')])
        });
    }

    getImage(budgetType: string): string {
        return getTagBudgetTypeImage(budgetType);
    }

    ngOnChanges(changes: SimpleChanges) {
        // Object.keys(TagBudgetType).filter(key => console.log(TagBudgetType[key]));
        if (changes.budget.currentValue !== undefined) {
            this.budgetKey = changes.budget.currentValue['$key'];
            this.formGroup.setValue({
                'tagType': changes.budget.currentValue['$value'] !== null ? this.budget.tagType : '',
                'description': changes.budget.currentValue['$value'] !== null ? this.budget.description : '',
                'amount': changes.budget.currentValue['$value'] !== null ? this.budget.amount : ''
            });
        }
    }

    saveBudget() {
        if (!this.formGroup.valid) {
            console.log('invalid');
            this.formGroup.get('description').markAsTouched();
            this.formGroup.get('amount').markAsTouched();
        } else {
            this.budget.tagType = this.formGroup.get('tagType').value;
            this.budget.description = this.formGroup.get('description').value;
            this.budget.amount = this.formGroup.get('amount').value;

            let budgetAction: BudgetAction;
            if (this.isEmptyKey()) {
                budgetAction = new BudgetAction(Action.INSERT, this.budget);
            } else {
                budgetAction = new BudgetAction(Action.UPDATE, this.budget);
                budgetAction.key = this.budgetKey;
            }
            this.actionClickEmitAndResetFormGroup(budgetAction);
        }
    }

    deleteBudget() {
        if (!this.isEmptyKey()) {
            const budgetAction: BudgetAction = new BudgetAction(Action.DELETE);
            budgetAction.key = this.budgetKey;
            this.actionClickEmitAndResetFormGroup(budgetAction);
        }
    }

    close() {
        this.closeClick.emit();
        this.formGroup.reset();
    }

    private actionClickEmitAndResetFormGroup(budgetAction: BudgetAction) {
        this.budgetService.doActionOnBudget(budgetAction);
        this.close();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.budgetKey) || this.budgetKey === null;
    }
}
