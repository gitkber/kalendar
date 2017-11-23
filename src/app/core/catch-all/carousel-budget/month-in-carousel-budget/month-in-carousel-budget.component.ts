import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation } from '../../../../kalendar/navigation';
import { DayItem } from '../../../../kalendar/day-item';
import { MontthInCarouselBudget } from './montth-in-carousel-budget';

@Component({
    selector: 'month-in-carousel-budget',
    templateUrl: 'month-in-carousel-budget.component.html',
    styleUrls: ['./month-in-carousel-budget.component.css']
})
export class MonthInCarouselBudgetComponent {

    @Input() month: MontthInCarouselBudget;
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();

    navigateToMonth() {
        const navigation: Navigation = new Navigation('month');
        navigation.isMonth = true;
        navigation.toDate = this.month.date;
        this.navigateClick.emit(navigation);
    }

}
