import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

    @Input() contacts: FirebaseListObservable<Contact[]>;
    @Output() showContactClick: EventEmitter<Contact> = new EventEmitter();

    showContact(contact: Contact) {
        this.showContactClick.emit(contact);
    }

    addContact() {
        this.showContactClick.emit(new Contact(null, null, null, null, null));
    }

}
