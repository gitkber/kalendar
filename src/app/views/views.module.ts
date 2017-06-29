import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalendarModule } from "../kalendar/kalendar.module";

import { HomeViewComponent } from "./home-view/home-view.component";
import { LoginViewComponent } from "./login-view/login-view.component";
import { PersonsViewComponent } from './persons-view/persons-view.component';
import { KalYearViewComponent } from './kal-year-view/kal-year-view.component';
import { KalMonthViewComponent } from './kal-month-view/kal-month-view.component';

@NgModule({
    imports: [BrowserModule, RouterModule, KalendarModule],
    declarations: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, KalMonthViewComponent, PersonsViewComponent],
    exports: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, KalMonthViewComponent, PersonsViewComponent],
    providers: []
})
export class ViewsModule { }