import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { CatchAll, CatchAllAction, CatchBudget, CatchProject } from './catch-all';
import { Action } from '../action';
import { AuthService } from '../service/auth.service';
import { TagBudgetType, TagCase, TagCaseType } from '../../common/utils/tag';

@Injectable()
export class CatchAllService {

    private firebaseListObservable: FirebaseListObservable<CatchAll[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService) {
        this.firebaseListObservable = this.db.list('/catchall', {
            // preserveSnapshot: true,
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId,
            },
        })
    }

    getBudgetMinRef(): any {
        return this.firebaseListObservable.$ref
            .orderByChild('user').equalTo(this.authService.currentUserId);
        // .orderByChild('tagCase').equalTo(TagCase.BUDGET)
        // .orderByChild('tagCaseType').equalTo(TagCaseType.MIN);
    }

    getCatchAllByTagCaseType(tagCaseType): Observable<CatchAll[]> {
        return this.firebaseListObservable.map(items => items.filter(item => item.tagCaseType === tagCaseType));
    }

    sumCatchBudgetMin(): any {
        // const numbers = [15.5, 2.3, 1.1, 4.7]; // 23.6
        // return numbers.map(value => value * 2);
        return this.firebaseListObservable.map(
            items => items.filter(item => item.tagCase === TagCase.BUDGET && item.tagCaseType === TagCaseType.MIN)
            // .map(result => +result.budget)
                .reduce((accumulator, currentValue) => {
                    console.log(accumulator, currentValue);
                    return accumulator + +currentValue.budget;
                }, 0)
        );
    }

    sumByGroupCatchBudgetMin(firstDate: Date, lastDate: Date): any {
        return this.firebaseListObservable.map(
            items => items
                .filter(item => {
                    const kalendarDate: Date = new Date(item.kalendarDate);
                    return item.tagCase === TagCase.BUDGET && item.tagCaseType === TagCaseType.MIN
                        && firstDate.getTime() <= kalendarDate.getTime() && lastDate.getTime() >= kalendarDate.getTime();
                }).reduce((accumulator, currentValue) => {
                    const index = accumulator.findIndex(v => v.budgetType === currentValue.tagBudgetType);
                    if (index === -1) {
                        accumulator.push({budgetType: currentValue.tagBudgetType, amount: +currentValue.budget, detail: [currentValue]});
                    } else {
                        accumulator[index].amount += +currentValue.budget;
                        accumulator[index].detail.push(currentValue);
                    }
                    accumulator[0].amount += +currentValue.budget;
                    return accumulator;
                }, [{budgetType: 'TOTAL', amount: 0}])
        );
    }

    doActionOnCatchAll(event: CatchAllAction) {
        if (event.action === Action.INSERT) {
            event.catchAll.user = this.authService.currentUserId;
            this.firebaseListObservable.push(event.catchAll);
        } else if (event.action === Action.UPDATE) {
            this.firebaseListObservable.update(event.key, event.catchAll);
        } else if (event.action === Action.DELETE) {
            this.firebaseListObservable.remove(event.key);
        }
    }

    insertOtherList() {
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.OBJECTIVE, TagCaseType.ADMINISTRATION, 'trier photos', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.OBJECTIVE, TagCaseType.ADMINISTRATION, 'trier papiers', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.OBJECTIVE, TagCaseType.HEALTH, 'ww (57)', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.OBJECTIVE, TagCaseType.HEALTH, 'bien se nourrir', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.OBJECTIVE, TagCaseType.HEALTH, 'faire du sport', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.OBJECTIVE, TagCaseType.HEALTH, 'arreter de fumer', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.TODO, TagCaseType.ADMINISTRATION, 'relever courrier', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.TODO, TagCaseType.ADMINISTRATION, 'payer factures', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.TODO, TagCaseType.FAMILY, 'tel Véro', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.OBJECTIVE, TagCaseType.FAMILY, 'organiser annif elsa', '2018-03-01'));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.TODO, TagCaseType.HEALTH, 'prendre rdv checkup', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.TODO, TagCaseType.HEALTH, 'prendre rdv dentiste', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.VARIOUS, TagCaseType.THOUGHT_OF_DAY, 'Au bonheur de Elsa', null));
    }

    insertProjetList() {
        this.firebaseListObservable.push(
            new CatchProject(null, TagCase.TODO, TagCaseType.PROJECT, 'UC_VIEWS', 'HOME_VIEW', 'layout', 'IN_PROGRESS', null));
    }

    insertBudgetList() {
        // https://json-csv.com/
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.TO_BUY, TagBudgetType.HOME, 'armoire à chaussures', null, null));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.TO_BUY, TagBudgetType.CLOTHES, 'veste', null, null));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.HEALTH, 'dentiste', '2017-12-15', '47.52'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.HOME, 'pret hypothecaire', '2017-10-01', '672.85'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.HOME, 'pret hypothecaire', '2017-11-01', '672.85'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.HOME, 'pret hypothecaire', '2017-12-01', '672.85'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.HOME, 'luminus', '2017-11-05', '202.85'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.HOME, 'luminus', '2017-12-05', '202.85'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.HOME, 'base', '2017-12-25', '15.00'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.FOOD, 'carrefour', '2017-11-05', '115.40'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.FOOD, 'carrefour', '2017-12-05', '12.50'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.FOOD, 'carrefour', '2017-12-15', '125.24'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.FOOD, 'quick', '2017-12-16', '45.94'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.CLOTHES, 'pantalon', '2017-12-03', '65.22'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.CLOTHES, 'gants elsa', '2017-12-01', '10.99'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.MIN, TagBudgetType.CLOTHES, 'divers elsa', '2017-12-22', '101.98'));
        this.firebaseListObservable.push(new CatchBudget(this.authService.currentUserId,
            TagCase.BUDGET, TagCaseType.PLUS, TagBudgetType.WORK, 'salaire', '2017-12-22', '1296.98'));
    }

}
