import { Component, Output, Input, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from "../../contact/contact";
import { ContactAction } from "../contact-action";
import { Action } from "../../action";

@Component({
    selector: 'contact-form',
    templateUrl: 'contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnChanges {

    @Output() actionClick = new EventEmitter<ContactAction>();
    private contactFormGroup: FormGroup;

    @Input() contact: Contact;
    private contactKey: string;

    ngOnInit() {
        this.contactFormGroup = new FormGroup({
            firstname: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required)
        });
        this.contactFormGroup.valueChanges.subscribe(data => {
            this.contact = data
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.contact.currentValue != undefined) {
            this.contactKey = changes.contact.currentValue['$key']
            this.contact = changes.contact.currentValue;
            this.contactFormGroup.setValue({
                'firstname': this.contact.firstname,
                'lastname': this.contact.lastname
            });
        }
    }

    addContact() {
        let contactAction: ContactAction;
        if (this.contactKey === undefined) {
            contactAction = new ContactAction(Action.INSERT, this.contact);
        } else {
            contactAction = new ContactAction(Action.UPDATE, this.contact);
            contactAction.contactKey = this.contactKey;
        }
        this.actionClick.emit(contactAction);
        this.contactKey = undefined;
        this.contactFormGroup.reset();
    }

    deleteContact() {
        let contactAction: ContactAction;
        if (this.contactKey !== undefined) {
            contactAction = new ContactAction(Action.DELETE);
            contactAction.contactKey = this.contactKey;
            this.actionClick.emit(contactAction);
            this.contactKey = undefined;
            this.contactFormGroup.reset();
        }
    }
}