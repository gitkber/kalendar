import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ContactService } from '../../core/contact/contact.service';
import { Contact, ContactAction } from '../../core/contact/contact';

@Component({
    selector: 'contacts-view',
    templateUrl: './contacts-view.component.html',
    styleUrls: ['./contacts-view.component.css']
})
export class ContactsViewComponent implements OnInit {

    public contactSelected: Contact;
    public contacts: FirebaseListObservable<Contact[]>;

    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.contacts = this.contactService.getList();
        this.contactSelected = new Contact(null, null, null, null, null);
    }

    showContact(event: Contact) {
        this.contactSelected = event;
    }

    doActionOnContact(event: ContactAction) {
        this.contactService.doActionOnContact(event);
    }
}
