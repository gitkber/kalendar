import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ContactService } from '../../core/contact/contact.service';
import { Contact } from '../../core/contact/contact';
import { CoreModalComponent } from '../modal/core-modal/core-modal.component';

@Component({
    selector: 'contacts-view',
    templateUrl: './contacts-view.component.html',
    styleUrls: ['./contacts-view.component.css']
})
export class ContactsViewComponent implements OnInit {

    @ViewChild(CoreModalComponent) coreModal: CoreModalComponent;

    public contacts: FirebaseListObservable<Contact[]>;
    public postItContacts: FirebaseListObservable<Contact[]>;

    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.contacts = this.contactService.getList();
        this.postItContacts = this.contactService.getContactForPostId();
    }

    showContact(event: Contact) {
        this.coreModal.openContactForm(event);
    }

}
