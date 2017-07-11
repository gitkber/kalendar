import { Component, Input } from '@angular/core';
import { Day } from '../day';

@Component({
  selector: 'day-in-four-days',
  templateUrl: 'day-in-four-days.component.html',
  styleUrls: ['./day-in-four-days.component.css']
})
export class DayInFourDaysComponent {

  @Input() day: Day;

}
