import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

    private subject = new Subject<Date>();
    public currentDate: Date;

    constructor() {
        //this.currentDate = new Date();
        //this.subject.next(this.currentDate);
    }

    get date(): Observable<Date> {
        return this.subject.asObservable();
    }

    selectDate(date: Date) {
        this.currentDate = date;
        this.subject.next(this.currentDate);
    }

    nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate(), 12, 0, 0);
        this.subject.next(this.currentDate);
    }

    previousMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, this.currentDate.getDate(), 12, 0, 0);
        this.subject.next(this.currentDate);
    }

    nextYear() {
        this.currentDate = new Date(this.currentDate.getFullYear() + 1, this.currentDate.getMonth(), this.currentDate.getDate(), 12, 0, 0);
        this.subject.next(this.currentDate);
    }

    previousYear() {
        this.currentDate = new Date(this.currentDate.getFullYear() - 1, this.currentDate.getMonth(), this.currentDate.getDate(), 12, 0, 0);
        this.subject.next(this.currentDate);
    }
}
