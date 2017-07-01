import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalendarModule } from "../kalendar/kalendar.module";

import { HomeViewComponent } from "./home-view/home-view.component";
import { LoginViewComponent } from "./login-view/login-view.component";
import { PersonsViewComponent } from './persons-view/persons-view.component';
import { KalYearViewComponent } from './kal-year-view/kal-year-view.component';
import { KalMonthViewComponent } from './kal-month-view/kal-month-view.component';

import { SheetOfPaperComponent } from "./login-view/sheet-of-paper/sheet-of-paper.component";
import { LoginPanelComponent } from './login-view/login-panel/login-panel.component';
import { PolaroidComponent } from './login-view/polaroid/polaroid.component';

import { TopMenuComponent } from './home-view/top-menu/top-menu.component';
import { FourDaysComponent } from './home-view/four-days/four-days.component';

@NgModule({
    imports: [BrowserModule, RouterModule, KalendarModule],
    declarations: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, KalMonthViewComponent, PersonsViewComponent, 
        SheetOfPaperComponent, LoginPanelComponent, PolaroidComponent,
        TopMenuComponent, FourDaysComponent],
    exports: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, KalMonthViewComponent, PersonsViewComponent],
    providers: []
})
export class ViewsModule { }