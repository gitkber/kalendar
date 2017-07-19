import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {

    constructor(private router: Router) { }

    navigateToRoot() {
        this.router.navigateByUrl('/');
    }

    navigateToHome() {
        this.router.navigateByUrl('/home');
    }

    navigateToContacts() {
        this.router.navigateByUrl('/contacts');
    }

    navigateToLines() {
        this.router.navigate(['/lines'])
    }

    navigateToKalYear(date: Date) {
        this.router.navigate(['/kalyear', date.toISOString().substring(0, 10)]);
    }

    navigateToKalMonth(date: Date) {
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
