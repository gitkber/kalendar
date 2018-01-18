import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { DateUtilService } from '../../../common/utils/date-util.service';
import { isUndefined } from 'util';
import { Budget, BudgetAction } from '../budget';

@Component({
    selector: 'budget-form',
    templateUrl: 'budget-form.component.html',
    styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnChanges {

    @Input() fillYear: boolean;
    @Input() budget: Budget;
    @Output() actionClick = new EventEmitter<BudgetAction>();

    public title: string;
    public budgetFormGroup: FormGroup;
    private budgetKey: string;

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    constructor(public dateUtilService: DateUtilService) {
        this.budgetFormGroup = new FormGroup({
            tagOperation: new FormControl('', Validators.required),
            tagType: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            kalendarDate: new FormControl(''),
            amount: new FormControl('')
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.budget.currentValue !== undefined) {
            this.budgetKey = changes.budget.currentValue['$key'];
            if (this.isEmptyKey()) {
                this.title = 'Ajouter un budget';
            } else {
                this.title = 'Modifier ce budget';
            }
            this.budgetFormGroup.setValue({
                'tagOperation': this.budget.tagOperation,
                'tagType': this.budget.tagType,
                'description': this.budget.description,
                'kalendarDate': this.dateStringPipe.transform(this.budget.kalendarDate),
                'amount': this.budget.amount
            });
        }
    }

    addBudget() {
        this.budget.tagOperation = this.budgetFormGroup.get('tagOperation').value;
        this.budget.tagType = this.budgetFormGroup.get('tagType').value;
        this.budget.description = this.budgetFormGroup.get('description').value;
        this.budget.amount = this.budgetFormGroup.get('amount').value;
        this.budget.kalendarDate = this.dateStringPipe.transform(this.budgetFormGroup.get('kalendarDate').value, true);

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
