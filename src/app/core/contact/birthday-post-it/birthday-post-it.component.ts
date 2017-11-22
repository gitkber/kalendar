import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact';
import { DateUtilService } from '../../../common/utils/date-util.service';

@Component({
    selector: 'birthday-post-it',
    templateUrl: './birthday-post-it.component.html',
    styleUrls: ['./birthday-post-it.component.css']
})
export class BirthdayPostItComponent implements OnInit {

    @Input() contact: Contact;
    @Output() showDetailClick: EventEmitter<Contact> = new EventEmitter<Contact>();

    public inXdays: string;

    constructor(public dateUtilService: DateUtilService) { }

    ngOnInit(): void {
        const today: Date = new Date();
        today.setHours(0, 0, 0, 0);
        let date: string = this.dateUtilService.replaceYear(today.getFullYear() + '', this.contact.birthdate);
        let birthdate: Date = new Date(date);
        birthdate.setHours(0, 0, 0, 0);
        if (birthdate.getTime() === today.getTime()) {
            this.inXdays = 'Happy birthday';
        } else {
            if (birthdate.getTime() < today.getTime()) {
                date = this.dateUtilService.replaceYear((today.getFullYear() + 1) + '', this.contact.birthdate);
                birthdate = new Date(date);
                birthdate.setHours(0, 0, 0, 0);
            }
            const ndays = Math.round((birthdate.getTime() - today.getTime()) / (24 * 3600 * 1000));
            this.inXdays = 'Dans ' + ndays + ' jours';
        }
    }

    showDetail() {
        this.showDetailClick.emit(this.contact);
    }
}
