import { Component, OnInit } from '@angular/core';
import { FourDays } from "../../kalendar/four-days/four-days";
import { ContactService } from "../../core/contact/contact.service";

@Component({
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  private fourDays: FourDays;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.fourDays = new FourDays(new Date());
    this.contactService.populateFourDays(this.fourDays);
  }

  nextDay(event) {
    // event.navigation === day
    //this.fourDays.next();
    this.contactService.populateDayInFourDays(this.fourDays.next());
  }
  previousDay(event) {
    // event.navigation === day
    //this.fourDays.previous();
    this.contactService.populateDayInFourDays(this.fourDays.previous());
  }
}
