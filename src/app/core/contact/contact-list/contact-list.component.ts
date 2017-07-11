import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

    @Input() contacts: FirebaseListObservable<Contact[]>;
    @Output() showContactClick: EventEmitter<Contact> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    showContact(contact: Contact) {
        this.showContactClick.emit(contact);
    }

}
