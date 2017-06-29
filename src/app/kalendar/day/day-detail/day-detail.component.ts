import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Day } from "../day";

@Component({
    selector: 'day-detail',
    templateUrl: 'day-detail.component.html',
    styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent {

    @Input() day: Day;

}