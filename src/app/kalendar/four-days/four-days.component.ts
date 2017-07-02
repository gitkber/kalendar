import { Component, OnInit, Input } from '@angular/core';
import { Day } from "../day/day";
import { FourDays } from "./four-days";

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
