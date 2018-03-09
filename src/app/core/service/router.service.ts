import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DateUtilService } from '../../common/utils/date-util.service';

@Injectable()
export class RouterService {

    constructor(private router: Router, public location: Location, public dateUtilService: DateUtilService) { }

    back() {
        this.location.back();
    }

    navigateToHome() {
        this.router.navigateByUrl('/');
    }

    navigateToDay() {
        this.router.navigateByUrl('/day');
    }

    navigateToContacts() {
        this.router.navigateByUrl('/contacts');
    }

    navigateToBudget() {
        this.router.navigateByUrl('/budget');
    }

    navigateToObjectives() {
        this.router.navigateByUrl('/objective');
    }

    navigateToAlbum() {
        this.router.navigateByUrl('/album');
    }

    navigateToKalYear(date: Date) {
        this.router.navigate(['/kalyear', this.dateUtilService.toString(date)]);
    }

    navigateToKalMonth(date: Date) {
        this.router.navigate(['/kalmonth', this.dateUtilService.toString(date)]);
    }

    isDayViewSelected(): boolean {
        return this.router.isActive('/day', true);
    }

    isContactsViewSelected(): boolean {
        return this.router.isActive('/contacts', true);
    }

    isObjectiveViewSelected(): boolean {
        return this.router.isActive('/objective', true);
    }

    isAlbumViewSelected(): boolean {
        return this.router.isActive('/album', true);
    }

    isBudgetViewSelected(): boolean {
        return this.router.isActive('/budget', true);
    }

    isKalYearViewSelected(): boolean {
        return this.router.isActive('/kalyear', false);
    }

}
