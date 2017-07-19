import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "../common/common.module";
import { MonthComponent } from './month/month.component';
import { DayInMonthComponent } from './day/day-in-month/day-in-month.component';
import { DayInOneWeekComponent } from './day/day-in-one-week/day-in-one-week.component';
import { OneWeekComponent } from './one-week/one-week.component';
import { SelectDateComponent } from './select-date/select-date.component';

@NgModule({
    imports: [BrowserModule, RouterModule, CommonModule],
    declarations: [MonthComponent, DayInMonthComponent, DayInOneWeekComponent, OneWeekComponent,
        SelectDateComponent],
    exports: [MonthComponent, DayInMonthComponent, DayInOneWeekComponent, OneWeekComponent,
        SelectDateComponent],
    providers: []
})
export class KalendarModule { }
