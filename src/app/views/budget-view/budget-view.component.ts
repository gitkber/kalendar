import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ViewsFacade } from '../views.facade';
import { AppService } from '../../app.service';
import { RouterService } from '../../core/service/router.service';
import { CatchAll } from '../../core/catch-all/catch-all';
import { CarouselBudget } from '../../core/catch-all/carousel-budget/carousel-budget';
import { TagCaseType } from '../../common/utils/tag';
import { DayItem } from '../../kalendar/day-item';
import { Navigation } from '../../kalendar/navigation';

@Component({
    selector: 'budget-view',
    templateUrl: './budget-view.component.html',
    styleUrls: ['./budget-view.component.css']
})
export class BudgetViewComponent implements OnInit {

    public carouselBudget: CarouselBudget;
    public catchAllsToBuy: Observable<CatchAll[]>;

    TagCaseType = TagCaseType;

    constructor(
        public routerService: RouterService,
        private viewsFacade: ViewsFacade,
        private appService: AppService
    ) { }

    ngOnInit(): void {
        // this.viewsFacade.catchAllService.insertBudgetList();
        // this.viewsFacade.catchAllService.insertOtherList();
        // this.viewsFacade.catchAllService.insertProjetList();

        this.carouselBudget = new CarouselBudget(this.appService.currentDate);
        this.viewsFacade.populateMonths(this.carouselBudget.months);

        this.catchAllsToBuy = this.viewsFacade.catchAllService.getCatchAllByTagCaseType(TagCaseType.TO_BUY);
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
