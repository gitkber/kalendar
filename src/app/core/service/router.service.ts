import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DateUtilService } from './date-util.service';

@Injectable()
export class RouterService {

    constructor(private router: Router, public location: Location, public dateUtilService: DateUtilService) { }

    back() {
        this.location.back();
    }

    navigateToRoot() {
        this.router.navigateByUrl('/');
    }

    navigateToHome() {
        this.router.navigateByUrl('/home');
    }

    navigateToContacts() {
        this.router.navigateByUrl('/contacts');
    }

    navigateToKalYear(date: Date) {
        this.router.navigate(['/kalyear', this.dateUtilService.toString(date)]);
    }

    navigateToKalMonth(date: Date) {
        this.router.navigate(['/kalmonth', this.dateUtilService.toString(date)]);
    }

    isHomeViewSelected(): boolean {
        return this.router.isActive('/home', true);
    }

    isContactsViewSelected(): boolean {
        return this.router.isActive('/contacts', true);
    }

    isKalYearViewSelected(): boolean {
        return this.router.isActive('/kalyear', false);
    }

}
