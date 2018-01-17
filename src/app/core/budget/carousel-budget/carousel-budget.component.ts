import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation } from '../../../kalendar/navigation';
import { DayItem } from '../../../kalendar/day-item';
import { CarouselBudget } from './carousel-budget';

@Component({
    selector: 'carousel-budget',
    templateUrl: './carousel-budget.component.html',
    styleUrls: ['./carousel-budget.component.css']
})
export class CarouselBudgetComponent {

    @Input() carouselBudget: CarouselBudget;
    @Input() navigation: string; // year - month - day
    @Output() showDayItemClick: EventEmitter<DayItem> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }

    showDayItem(event: DayItem) {
        this.showDayItemClick.emit(event);
    }

}
