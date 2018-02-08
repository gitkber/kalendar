import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ContactService } from '../../core/contact/contact.service';
import { Contact } from '../../core/contact/contact';

@Component({
    selector: 'contacts-view',
    templateUrl: './contacts-view.component.html',
    styleUrls: ['./contacts-view.component.css']
})
export class ContactsViewComponent implements OnInit {

    public contacts: FirebaseListObservable<Contact[]>;
    public postItContacts: FirebaseListObservable<Contact[]>;

    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.contacts = this.contactService.getList();
        this.postItContacts = this.contactService.getContactForPostId();
    }

    showContact(event: Contact) {
        // TODO
        console.log('TODO', event);
    }

}
