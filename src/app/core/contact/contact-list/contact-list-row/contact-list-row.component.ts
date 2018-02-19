import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../contact';
import { ContactService } from '../../contact.service';

@Component({
    selector: 'contact-list-row',
    templateUrl: './contact-list-row.component.html',
    styleUrls: ['./contact-list-row.component.css']
})
export class ContactListRowComponent {

    @Input() contact: Contact;
    public editMode: boolean;
    @Output() showContactClick: EventEmitter<Contact> = new EventEmitter();
    // public contactSelected: Observable<Contact>;

    constructor(private contactService: ContactService) { }

    showContact(contact: Contact) {
        // this.showContactClick.emit(contact);
        // this.contactSelected = this.contactService.getContact(contact['$key']);
        // console.log(this.contactSelected);
        this.editMode = true;
    }

    addContact() {
        // this.showContactClick.emit(new Contact(null, null, null));
        // this.contactSelected = Observable.of(new Contact(null, null, null));
    }

    close() {
        this.editMode = false;
        // this.contactSelected = undefined;
    }
}
