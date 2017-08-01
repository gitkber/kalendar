import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ContactService } from "../../core/contact/contact.service";
import { Contact } from "../../core/contact/contact";
import { ContactAction } from "../../core/contact/contact-action";

@Component({
  selector: 'contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.css']
})
export class ContactsViewComponent implements OnInit {
  /*
    title = 'Kalendar';
    items: FirebaseListObservable<any[]>;
  
    constructor(public af: AngularFireDatabase) {
      this.items = af.list('/messages', {
        query: {
          limitToLast: 50
        }
      });
    }
  */
  public contactSelected: Contact;
  public contacts: FirebaseListObservable<Contact[]>

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getList();
  }

  showContact(event: Contact) {
    this.contactSelected = event;
  }

  doActionOnContact(event: ContactAction) {
    console.log("doActionOnContact event", event);
    this.contactService.doActionOnContact(event);
  }
}
