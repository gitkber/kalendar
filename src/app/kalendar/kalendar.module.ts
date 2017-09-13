import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '../common/common.module';
import { DayInMonthComponent } from './day/day-in-month/day-in-month.component';
import { DayInOneWeekComponent } from './day/day-in-one-week/day-in-one-week.component';
import { DayInYearComponent } from './day/day-in-year/day-in-year.component';
import { OneDayComponent } from './day/one-day/one-day.component';
import { OneWeekComponent } from './week/one-week/one-week.component';
import { OneMonthComponent } from './month/one-month/one-month.component';
import { MonthInYearComponent } from './month/month-in-year/month-in-year.component';
import { OneYearComponent } from './year/one-year/one-year.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { NavigPanelComponent } from './navig-panel/navig-panel.component';

@NgModule({
    imports: [BrowserModule, RouterModule, CommonModule],
    declarations: [DayInMonthComponent, DayInOneWeekComponent, DayInYearComponent, OneDayComponent,
        OneWeekComponent,
        OneMonthComponent, MonthInYearComponent,
        OneYearComponent,
        NavigPanelComponent,
        SelectDateComponent
    ],
    exports: [OneDayComponent, OneWeekComponent, OneMonthComponent, OneYearComponent,
        SelectDateComponent],
    providers: []
})
export class KalendarModule {
}
