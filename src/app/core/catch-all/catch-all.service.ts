import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { CatchAll, CatchAllAction, CatchProject, TagCase, TagCaseType } from './catch-all';
import { Action } from '../action';
import { AuthService } from '../service/auth.service';

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
                        accumulator.push({
                            budgetType: currentValue.tagBudgetType,
                            amount: +currentValue.budget,
                            detail: [currentValue]
                        });
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
            new CatchAll(this.authService.currentUserId, TagCase.OBJECTIVE, TagCaseType.HEALTH, 'Bien chez soi. Opération \'blanc\' '
                + ': Ménage in/out : intérieur et exterieur (jeter ce qui est inutile)... 15 à 30 minutes par jour', null));
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
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.VARIOUS, TagCaseType.THOUGHT_OF_DAY, 'Le changement est une porte '
                + 'qui ne s\'ouvre que de l\'intérieur. (Tom Peters)', null));
        this.firebaseListObservable.push(
            new CatchAll(this.authService.currentUserId, TagCase.VARIOUS, TagCaseType.THOUGHT_OF_DAY, 'Je suis la seule '
                + 'personne responsable de ma vie et de mon bonheur.', null));
    }

    insertProjetList() {
        this.firebaseListObservable.push(
            new CatchProject(null, TagCase.TODO, TagCaseType.PROJECT, 'UC_VIEWS', 'HOME_VIEW', 'layout', 'IN_PROGRESS', null));
    }

}
