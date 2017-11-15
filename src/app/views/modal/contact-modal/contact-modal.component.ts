import { Component, HostListener, Input } from '@angular/core';
import { ViewsFacade } from '../../views.facade';
import { Contact, ContactAction } from '../../../core/contact/contact';

@Component({
    selector: 'contact-modal',
    templateUrl: './contact-modal.component.html',
    styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {

    @Input() blocking = false;

    public isOpen = false;
    public contactSelected: Contact;

    constructor(private viewsFacade: ViewsFacade) {
        console.log('ContactModalComponent');
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.close();
    }

    open(contact: Contact): void {
        this.isOpen = true;
        this.contactSelected = contact;
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    doActionOnContact(event: ContactAction) {
        this.viewsFacade.contactService.doActionOnContact(event);
        this.close();
    }

}
