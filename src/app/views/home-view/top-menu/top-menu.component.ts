import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  @Input() navigation: string; // year - month - day
  @Output() nextClick: EventEmitter<any> = new EventEmitter();
  @Output() previousClick: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToKalYear() {
    this.router.navigateByUrl('/kalyear');
  }
  navigateToKalMonth() {
    this.router.navigateByUrl('/kalmonth');
  }
  navigateToContacts() {
    this.router.navigateByUrl('/contacts');
  }

  goNext() {
    this.nextClick.emit(this.navigation);
  }

  goPrevious() {
    this.previousClick.emit(this.navigation);
  }
}
