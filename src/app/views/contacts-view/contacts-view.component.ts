import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ContactService } from '../../core/contact/contact.service';
import { Contact, ContactAction } from '../../core/contact/contact';
import { ContactModalComponent } from '../modal/contact-modal/contact-modal.component';


@Component({
    selector: 'contacts-view',
    templateUrl: './contacts-view.component.html',
    styleUrls: ['./contacts-view.component.css']
})
export class ContactsViewComponent implements OnInit {

    @ViewChild(ContactModalComponent) contactModal: ContactModalComponent;

    public contacts: FirebaseListObservable<Contact[]>;
    public postItContacts: FirebaseListObservable<Contact[]>;

    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.contacts = this.contactService.getList();
        this.postItContacts = this.contactService.getContactForPostId();
    }

    showContact(event: Contact) {
        this.contactModal.open(event);
    }

    doActionOnContact(event: ContactAction) {
        this.contactService.doActionOnContact(event);
    }
}
