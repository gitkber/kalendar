import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonthComponent } from "./month/month.component";
import { DayInMonthComponent } from "./day/day-in-month/day-in-month.component";
import { DayDetailComponent } from "./day/day-detail/day-detail.component";
import { SelectDateComponent } from "./select-date/select-date.component";

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [MonthComponent, DayInMonthComponent, DayDetailComponent,
        SelectDateComponent],
    exports: [MonthComponent, DayInMonthComponent, DayDetailComponent,
        SelectDateComponent],
    providers: []
})
export class KalendarModule { }