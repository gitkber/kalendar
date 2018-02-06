import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact, ContactAction } from '../contact';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { DateUtilService } from '../../../common/utils/date-util.service';
import { isUndefined } from 'util';

@Component({
    selector: 'contact-detail',
    templateUrl: 'contact-detail.component.html',
    styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnChanges {

    @Input() fillYear: boolean;
    @Input() contact: Contact;
    @Output() actionClick = new EventEmitter<ContactAction>();

    public contactFormGroup: FormGroup;
    private contactKey: string;

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    constructor(public dateUtilService: DateUtilService) {
        this.contactFormGroup = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            birthdate: new FormControl('', Validators.required),
            year: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}')])
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.contact.currentValue !== undefined) {
            this.contactKey = changes.contact.currentValue['$key'];
            this.contactFormGroup.setValue({
                'firstname': this.contact.firstname,
                'lastname': this.contact.lastname,
                'birthdate': this.dateStringPipe.transform(this.contact.birthdate),
                'year': this.isEmptyKey() ? '' : this.dateUtilService.stringToYYYY(this.contact.birthdate)
            });
        }
    }

    hasContent(control: string): boolean {
        return this.contactFormGroup.get(control).value;
    }

    saveContact() {
        if (!this.contactFormGroup.valid) {
            console.log('invalid');
            this.contactFormGroup.get('firstname').markAsTouched();
            this.contactFormGroup.get('lastname').markAsTouched();
            this.contactFormGroup.get('year').markAsTouched();
        } else {
            this.contact.firstname = this.contactFormGroup.get('firstname').value;
            this.contact.lastname = this.contactFormGroup.get('lastname').value;
            if (this.fillYear) {
                const year: string = this.contactFormGroup.get('year').value;
                this.contact.birthdate = this.dateUtilService.replaceYear(year, this.contact.birthdate);
            } else {
                this.contact.birthdate = this.dateStringPipe.transform(this.contactFormGroup.get('birthdate').value, true);
            }
            let contactAction: ContactAction;
            if (this.isEmptyKey()) {
                contactAction = new ContactAction(Action.INSERT, this.contact);
            } else {
                contactAction = new ContactAction(Action.UPDATE, this.contact);
                contactAction.contactKey = this.contactKey;
            }
            this.actionClickEmitAndResetFormGroup(contactAction);
        }
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
