import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {

    public currentDate: Date;

    constructor() {
        this.currentDate = new Date();
    }

    nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate(), 12, 0, 0);
    }

    previousMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, this.currentDate.getDate(), 12, 0, 0);
    }

    nextYear() {
        this.currentDate = new Date(this.currentDate.getFullYear() + 1, this.currentDate.getMonth(), this.currentDate.getDate(), 12, 0, 0);
    }

    previousYear() {
        this.currentDate = new Date(this.currentDate.getFullYear() - 1, this.currentDate.getMonth(), this.currentDate.getDate(), 12, 0, 0);
    }
}
