import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact';
import { FirebaseListObservable } from 'angularfire2/database';
import { ContactService } from '../contact.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

    @Input() contacts: FirebaseListObservable<Contact[]>;
    @Output() showContactClick: EventEmitter<Contact> = new EventEmitter();
    public contactSelected: Observable<Contact>;

    constructor(private contactService: ContactService) { }

    showContact(contact: Contact) {
        // this.showContactClick.emit(contact);
        this.contactSelected = this.contactService.getContact(contact['$key']);
        console.log(this.contactSelected);
    }

    addContact() {
        // this.showContactClick.emit(new Contact(null, null, null));
        this.contactSelected = Observable.of(new Contact(null, null, null));
    }

    close() {
        this.contactSelected = undefined;
    }
}
