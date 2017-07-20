import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

    public isChildView: boolean;

    constructor(private router: Router, public location: Location) { }

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

    navigateToLines() {
        this.isChildView = false;
        this.router.navigate(['/lines'])
    }

    navigateToKalYear(date: Date) {
        this.isChildView = true;
        this.router.navigate(['/kalyear', date.toISOString().substring(0, 10)]);
    }

    navigateToKalMonth(date: Date) {
        this.isChildView = true;
        this.router.navigate(['/kalmonth', date.toISOString().substring(0, 10)]);
    }

    isHomeViewSelected(): boolean {
        return this.router.isActive('/home', true);
    }

    isContactsViewSelected(): boolean {
        return this.router.isActive('/contacts', true);
    }

    isLinesViewSelected(): boolean {
        return this.router.isActive('/lines', true);
    }

}
