import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ViewsFacade } from '../views.facade';
import { AppService } from '../../app.service';
import { RouterService } from '../../core/service/router.service';
import { CarouselBudget } from '../../core/budget/carousel-budget/carousel-budget';
import { DayItem } from '../../kalendar/day-item';
import { Navigation } from '../../kalendar/navigation';
import { Budget } from '../../core/budget/budget';

@Component({
    selector: 'budget-view',
    templateUrl: './budget-view.component.html',
    styleUrls: ['./budget-view.component.css']
})
export class BudgetViewComponent implements OnInit {

    public carouselBudget: CarouselBudget;
    public budgetToBuy: Observable<Budget[]>;

    constructor(
        public routerService: RouterService,
        private viewsFacade: ViewsFacade,
        private appService: AppService
    ) { }

    ngOnInit(): void {
        // this.viewsFacade.budgetService.insertBudgetList();

        this.carouselBudget = new CarouselBudget(this.appService.currentDate);
        this.viewsFacade.populateMonths(this.carouselBudget.months);
        this.carouselBudget.months.forEach(m => {
            m.budgetByGroups = this.viewsFacade.budgetService.sumByTagOperationMin(m.firstDate, m.lastDate);
        });

        this.budgetToBuy = this.viewsFacade.budgetService.findAllTagOperationToBuy();
    }

    navigate(event: Navigation) {
        console.log('navigate', event);
        if (event.isMonth) {
            this.carouselBudget.goToDate(event.toDate);
            // this.routerService.navigateToKalMonth(event.toDate);
        } else {
            console.warn('ERROR in BudgetView - Navigation');
        }
    }

    showDayItem(event: DayItem) {
        console.log('budget view showDayItem', event);
    }
}
