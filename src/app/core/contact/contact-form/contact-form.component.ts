import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact, ContactAction } from '../contact';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { isUndefined } from 'util';

@Component({
    selector: 'contact-form',
    templateUrl: 'contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnChanges, OnInit {

    @Input() contact: Contact;
    @Output() actionClick = new EventEmitter<ContactAction>();

    public title: string;
    public contactFormGroup: FormGroup;
    private contactKey: string;

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    constructor() {
        this.contactFormGroup = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            birthdate: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.contactFormGroup.valueChanges.subscribe(data => {
            this.contact = data
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.contact.currentValue !== undefined) {
            this.contactKey = changes.contact.currentValue['$key'];
            if (this.isEmptyKey()) {
                this.title = 'Ajouter un contact';
            } else {
                this.title = 'Modifier ce contact';
            }
            this.contact = changes.contact.currentValue;
            this.contactFormGroup.setValue({
                'firstname': this.contact.firstname,
                'lastname': this.contact.lastname,
                'birthdate': this.dateStringPipe.transform(this.contact.birthdate)
            });
        }
    }

    addContact() {
        this.contact.birthdate = this.dateStringPipe.transform(this.contact.birthdate, true);

        let contactAction: ContactAction;
        if (this.isEmptyKey()) {
            contactAction = new ContactAction(Action.INSERT, this.contact);
        } else {
            contactAction = new ContactAction(Action.UPDATE, this.contact);
            contactAction.contactKey = this.contactKey;
        }
        this.actionClickEmitAndResetFormGroup(contactAction);
    }

    deleteContact() {
        if (!this.isEmptyKey()) {
            const contactAction: ContactAction = new ContactAction(Action.DELETE);
            contactAction.contactKey = this.contactKey;
            this.actionClickEmitAndResetFormGroup(contactAction);
        }
    }

    private actionClickEmitAndResetFormGroup(contactAction: ContactAction) {
        this.actionClick.emit(contactAction);
        this.contactKey = undefined;
        this.contactFormGroup.reset();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.contactKey) || this.contactKey === null;
    }
}
