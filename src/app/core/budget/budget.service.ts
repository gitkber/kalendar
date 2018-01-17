import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { Action } from '../action';
import { AuthService } from '../service/auth.service';
import { Budget, BudgetAction } from './budget';
import { TagBudgetOperation, TagBudgetType } from '../../common/utils/tag';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BudgetService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<Budget[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.path = '/budget/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
    }

    getMinRef(): any {
        return this.firebaseListObservable.$ref.orderByChild('tagOperation').equalTo(TagBudgetOperation.MIN);
    }

    findAllTagOperationToBuy(): Observable<Budget[]> {
        return this.firebaseListObservable.map(items => items.filter(item => item.tagOperation === TagBudgetOperation.TO_BUY));
    }

    sumByTagOperationMin(firstDate: Date, lastDate: Date): any {
        return this.firebaseListObservable.map(
            items => items
                .filter(item => {
                    const kalendarDate: Date = new Date(item.kalendarDate);
                    return item.tagOperation === TagBudgetOperation.MIN
                        && firstDate.getTime() <= kalendarDate.getTime() && lastDate.getTime() >= kalendarDate.getTime();
                }).reduce((accumulator, currentValue) => {
                    const index = accumulator.findIndex(v => v.budgetType === currentValue.tagType);
                    if (index === -1) {
                        accumulator.push({
                            budgetType: currentValue.tagType,
                            amount: +currentValue.amount,
                            detail: [currentValue]
                        });
                    } else {
                        accumulator[index].amount += +currentValue.amount;
                        accumulator[index].detail.push(currentValue);
                    }
                    accumulator[0].amount += +currentValue.amount;
                    return accumulator;
                }, [{budgetType: 'TOTAL', amount: 0}])
        );
    }

    doActionOnBudget(event: BudgetAction) {
        if (event.action === Action.INSERT) {
            this.firebaseListObservable.push(event.budget);
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.key, event.budget);
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.key);
        }
    }

    insertBudgetList() {
        // https://json-csv.com/
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.TO_BUY, TagBudgetType.HOME, 'armoire à chaussures', null, null));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.TO_BUY, TagBudgetType.CLOTHES, 'veste', null, null));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.TO_BUY, TagBudgetType.CLOTHES, 'charms en forme de lotus blanc/jaune/vert/bleu/violet/noir', null, null));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.HEALTH, 'dentiste', '2017-12-15', '47.52'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.HOME, 'pret hypothecaire', '2017-10-01', '672.85'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.HOME, 'pret hypothecaire', '2017-11-01', '672.85'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.HOME, 'pret hypothecaire', '2017-12-01', '672.85'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.HOME, 'luminus', '2017-11-05', '202.85'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.HOME, 'luminus', '2017-12-05', '202.85'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.HOME, 'base', '2017-12-25', '15.00'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.FOOD, 'carrefour', '2017-11-05', '115.40'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.FOOD, 'carrefour', '2017-12-05', '12.50'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.FOOD, 'carrefour', '2017-12-15', '125.24'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.FOOD, 'quick', '2017-12-16', '45.94'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.CLOTHES, 'pantalon', '2017-12-03', '65.22'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.CLOTHES, 'gants elsa', '2017-12-01', '10.99'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.MIN, TagBudgetType.CLOTHES, 'divers elsa', '2017-12-22', '101.98'));
        this.firebaseListObservable.push(new Budget(
            TagBudgetOperation.PLUS, TagBudgetType.WORK, 'salaire', '2017-12-22', '1296.98'));
    }

}
