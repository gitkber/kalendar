import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../day';
import { Navigation } from '../../navigation';

@Component({
    selector: 'one-day',
    templateUrl: 'one-day.component.html',
    styleUrls: ['./one-day.component.css']
})
export class OneDayComponent {

    @Input() day: Day;
    @Output() showDayDetailClick: EventEmitter<Day> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }
}
