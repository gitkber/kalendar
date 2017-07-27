import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '../common/common.module';
import { DayInMonthComponent } from './day/day-in-month/day-in-month.component';
import { DayInOneWeekComponent } from './day/day-in-one-week/day-in-one-week.component';
import { OneWeekComponent } from './week/one-week/one-week.component';
import { OneMonthComponent } from './month/one-month/one-month.component';
import { OneYearComponent } from './year/one-year/one-year.component';
import { SelectDateComponent } from './select-date/select-date.component';

@NgModule({
    imports: [BrowserModule, RouterModule, CommonModule],
    declarations: [DayInMonthComponent, DayInOneWeekComponent, OneWeekComponent, OneMonthComponent, OneYearComponent,
        SelectDateComponent],
    exports: [DayInMonthComponent, DayInOneWeekComponent, OneWeekComponent, OneMonthComponent, OneYearComponent,
        SelectDateComponent],
    providers: []
})
export class KalendarModule {
}
