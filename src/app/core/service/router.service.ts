import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DateUtilService } from './date-util.service';

@Injectable()
export class RouterService {

    public isChildView: boolean;

    constructor(private router: Router, public location: Location, public dateUtilService: DateUtilService) { }

    back() {
        this.isChildView = false;
        this.location.back();
    }

    navigateToRoot() {
        this.isChildView = false;
        this.router.navigateByUrl('/');
    }

    navigateToHome() {
        this.isChildView = false;
        this.router.navigateByUrl('/home');
    }

    navigateToContacts() {
        this.isChildView = false;
        this.router.navigateByUrl('/contacts');
    }

    navigateToMemos() {
        this.isChildView = false;
        this.router.navigate(['/memos'])
    }

    navigateToHolidays() {
        this.isChildView = false;
        this.router.navigate(['/holidays'])
    }

    navigateToKalYear(date: Date) {
        this.isChildView = true;
        this.router.navigate(['/kalyear', this.dateUtilService.toString(date)]);
    }

    navigateToKalMonth(date: Date) {
        this.isChildView = true;
        this.router.navigate(['/kalmonth', this.dateUtilService.toString(date)]);
    }

    isHomeViewSelected(): boolean {
        return this.router.isActive('/home', true);
    }

    isContactsViewSelected(): boolean {
        return this.router.isActive('/contacts', true);
    }

    isMemosViewSelected(): boolean {
        return this.router.isActive('/memos', true);
    }

    isHolidaysViewSelected(): boolean {
        return this.router.isActive('/holidays', true);
    }

    isKalYearViewSelected(): boolean {
        return this.router.isActive('/kalyear', true);
    }
}
