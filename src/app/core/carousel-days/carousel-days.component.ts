import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation } from '../../kalendar/navigation';
import { CarouselDays } from './carousel-days';
import { DayItem } from '../../kalendar/day-item';

@Component({
    selector: 'carousel-days',
    templateUrl: './carousel-days.component.html',
    styleUrls: ['./carousel-days.component.css']
})
export class CarouselDaysComponent {

    @Input() carouselDays: CarouselDays;
    @Input() navigation: string; // year - month - day
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }

}
