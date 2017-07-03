import { Component, OnInit, Input } from '@angular/core';
import { Contact } from "../contact";
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: FirebaseListObservable<Contact[]>;

  constructor() { }

  ngOnInit() {
  }

}
