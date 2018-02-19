import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact, ContactAction } from '../contact';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/utils/date-string.pipe';
import { DateUtilService } from '../../../common/utils/date-util.service';
import { isUndefined } from 'util';
import { ContactService } from '../contact.service';

@Component({
    selector: 'contact-detail',
    templateUrl: 'contact-detail.component.html',
    styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnChanges {

    @Input() fillYear: boolean;
    @Input() contact: Contact;
    @Output() closeClick = new EventEmitter();

    public formGroup: FormGroup;
    public contactKey: string;

    private dateStringPipe: DateStringPipe = new DateStringPipe();

    constructor(private contactService: ContactService, private dateUtilService: DateUtilService) {
        this.formGroup = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            birthdate: new FormControl('', Validators.required),
            year: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}')])
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.contact.currentValue !== undefined) {
            this.contactKey = changes.contact.currentValue['$key'];
            this.formGroup.setValue({
                'firstname': changes.contact.currentValue['$value'] !== null ? this.contact.firstname : '',
                'lastname': changes.contact.currentValue['$value'] !== null ? this.contact.lastname : '',
                'birthdate': this.dateStringPipe.transform(this.contact.birthdate),
                'year': this.isEmptyKey() ? '' : this.dateUtilService.stringToYYYY(this.contact.birthdate)
            });
        }
    }

    saveContact() {
        if (this.fillYear) {
            this.formGroup.patchValue({'birthdate': '99/99/9999'});
        } else {
            this.formGroup.patchValue({'year': '9999'});
        }

        if (!this.formGroup.valid) {
            this.formGroup.get('firstname').markAsTouched();
            this.formGroup.get('lastname').markAsTouched();
            this.formGroup.get('birthdate').markAsTouched();
            this.formGroup.get('year').markAsTouched();
        } else {
            this.contact.firstname = this.formGroup.get('firstname').value;
            this.contact.lastname = this.formGroup.get('lastname').value;
            if (this.fillYear) {
                const year: string = this.formGroup.get('year').value;
                this.contact.birthdate = this.dateUtilService.replaceYear(year, this.contact.birthdate);
            } else {
                this.contact.birthdate = this.dateStringPipe.transform(this.formGroup.get('birthdate').value, true);
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

    close() {
        this.closeClick.emit();
        this.formGroup.reset();
    }

    private actionClickEmitAndResetFormGroup(contactAction: ContactAction) {
        this.contactService.doActionOnContact(contactAction);
        this.close();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.contactKey) || this.contactKey === null;
    }
}
