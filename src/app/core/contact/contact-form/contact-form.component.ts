import {
    Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnInit, Output,
    SimpleChanges
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../contact/contact';
import { ContactAction } from '../contact-action';
import { Action } from '../../action';

@Component({
    selector: 'contact-form',
    templateUrl: 'contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnChanges, OnInit {

    private datePipe: DatePipe = new DatePipe(this._locale);

    @Output() actionClick = new EventEmitter<ContactAction>();
    public contactFormGroup: FormGroup;

    @Input() contact: Contact;
    private contactKey: string;

    constructor(@Inject(LOCALE_ID) private _locale: string) { }

    ngOnInit() {

        this.contactFormGroup = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            birthdate: new FormControl('', Validators.required)
        });
        this.contactFormGroup.valueChanges.subscribe(data => {
            this.contact = data
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.contact.currentValue !== undefined) {
            this.contactKey = changes.contact.currentValue['$key']
            this.contact = changes.contact.currentValue;
            this.contactFormGroup.setValue({
                'firstname': this.contact.firstname,
                'lastname': this.contact.lastname,
                'birthdate': this.datePipe.transform(this.contact.birthdate, 'dd/MM/yyyy')
            });
        }
    }

    addContact() {
        const datestring: string = this.contact.birthdate.toString();
        const dateItems = datestring.split('/');
        this.contact.birthdate = new Date(parseInt(dateItems[2]), parseInt(dateItems[1]) - 1, parseInt(dateItems[0]));

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
