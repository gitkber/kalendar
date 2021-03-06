import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '../common/common.module';
import { DayInMonthComponent } from './day/day-in-month/day-in-month.component';
import { DayInYearComponent } from './day/day-in-year/day-in-year.component';
import { OneMonthComponent } from './month/one-month/one-month.component';
import { MonthInYearComponent } from './month/month-in-year/month-in-year.component';
import { OneYearComponent } from './year/one-year/one-year.component';
import { NavigPanelComponent } from './navig-panel/navig-panel.component';

@NgModule({
    imports: [BrowserModule, RouterModule, CommonModule],
    declarations: [DayInMonthComponent, DayInYearComponent,
        OneMonthComponent, MonthInYearComponent,
        OneYearComponent,
        NavigPanelComponent
    ],
    exports: [OneMonthComponent, OneYearComponent],
    providers: []
})
export class KalendarModule {
}
