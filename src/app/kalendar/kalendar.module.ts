import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '../common/common.module';
import { DayInDayComponent } from './day/day-in-day/day-in-day.component';
import { DayInMonthComponent } from './day/day-in-month/day-in-month.component';
import { DayInOneWeekComponent } from './day/day-in-one-week/day-in-one-week.component';
import { DayInYearComponent } from './day/day-in-year/day-in-year.component';
import { OneDayComponent } from './day/one-day/one-day.component';
import { OneWeekComponent } from './week/one-week/one-week.component';
import { CarouselWeekComponent } from './week/carousel-week/carousel-week.component';
import { OneMonthComponent } from './month/one-month/one-month.component';
import { MonthInYearComponent } from './month/month-in-year/month-in-year.component';
import { OneYearComponent } from './year/one-year/one-year.component';
import { NavigPanelComponent } from './navig-panel/navig-panel.component';
import { WeekImageComponent } from './week-image/week-image.component';

@NgModule({
    imports: [BrowserModule, RouterModule, CommonModule],
    declarations: [DayInMonthComponent, DayInOneWeekComponent, DayInYearComponent, DayInDayComponent,
        OneDayComponent,
        OneWeekComponent, CarouselWeekComponent,
        OneMonthComponent, MonthInYearComponent,
        OneYearComponent,
        NavigPanelComponent, WeekImageComponent
    ],
    exports: [OneDayComponent, OneWeekComponent, OneMonthComponent, OneYearComponent,
        CarouselWeekComponent, WeekImageComponent],
    providers: []
})
export class KalendarModule {
}
