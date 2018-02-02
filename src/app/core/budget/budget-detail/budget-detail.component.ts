import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { DateUtilService } from '../../../common/utils/date-util.service';
import { isUndefined } from 'util';
import { Budget, BudgetAction } from '../budget';
import { TagBudgetType } from '../../../common/utils/tag';

@Component({
    selector: 'budget-detail',
    templateUrl: 'budget-detail.component.html',
    styleUrls: ['./budget-detail.component.css']
})
export class BudgetDetailComponent implements OnChanges {

    @Input() fillYear: boolean;
    @Input() budget: Budget;
    @Output() actionClick = new EventEmitter<BudgetAction>();

    public title: string;
    public budgetFormGroup: FormGroup;
    private budgetKey: string;

    public optionTypes: string[] = [];

    constructor(public dateUtilService: DateUtilService) {
        this.optionTypes = Object.keys(TagBudgetType);

        this.budgetFormGroup = new FormGroup({
            tagType: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            amount: new FormControl('')
        });

    }

    ngOnChanges(changes: SimpleChanges) {
        // Object.keys(TagBudgetType).filter(key => console.log(TagBudgetType[key]));
        if (changes.budget.currentValue !== undefined) {
            this.budgetKey = changes.budget.currentValue['$key'];
            if (this.isEmptyKey()) {
                this.title = 'Ajouter une dépense';
            } else {
                this.title = 'Modifier cette dépense';
            }
            this.budgetFormGroup.setValue({
                'tagType': this.budget.tagType,
                'description': this.budget.description,
                'amount': this.budget.amount
            });
        }
    }

    addBudget() {
        this.budget.tagType = this.budgetFormGroup.get('tagType').value;
        this.budget.description = this.budgetFormGroup.get('description').value;
        this.budget.amount = this.budgetFormGroup.get('amount').value;

        let budgetAction: BudgetAction;
        if (this.isEmptyKey()) {
            budgetAction = new BudgetAction(Action.INSERT, this.budget);
        } else {
            budgetAction = new BudgetAction(Action.UPDATE, this.budget);
            budgetAction.key = this.budgetKey;
        }
        this.actionClickEmitAndResetFormGroup(budgetAction);
    }

    deleteBudget() {
        if (!this.isEmptyKey()) {
            const budgetAction: BudgetAction = new BudgetAction(Action.DELETE);
            budgetAction.key = this.budgetKey;
            this.actionClickEmitAndResetFormGroup(budgetAction);
        }
    }

    private actionClickEmitAndResetFormGroup(budgetAction: BudgetAction) {
        this.actionClick.emit(budgetAction);
        this.budgetKey = undefined;
        this.budgetFormGroup.reset();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.budgetKey) || this.budgetKey === null;
    }
}
