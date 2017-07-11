import { Component, Input, OnInit } from '@angular/core';
import { FourDays } from './four-days';

@Component({
  selector: 'four-days',
  templateUrl: './four-days.component.html',
  styleUrls: ['./four-days.component.css']
})
export class FourDaysComponent implements OnInit {

  @Input() fourDays: FourDays;

  constructor() { }

  ngOnInit() { }

}
