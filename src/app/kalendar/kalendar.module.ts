import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonthComponent } from './month/month.component';
import { DayInMonthComponent } from './day/day-in-month/day-in-month.component';
import { DayInFourDaysComponent } from './day/day-in-four-days/day-in-four-days.component';
import { FourDaysComponent } from './four-days/four-days.component';
import { SelectDateComponent } from './select-date/select-date.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [MonthComponent, DayInMonthComponent, DayInFourDaysComponent, FourDaysComponent,
        SelectDateComponent],
    exports: [MonthComponent, DayInMonthComponent, DayInFourDaysComponent, FourDaysComponent,
        SelectDateComponent],
    providers: []
})
export class KalendarModule { }
