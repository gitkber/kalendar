import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalendarModule } from "../kalendar/kalendar.module";
import { CoreModule } from "../core/core.module";

import { HomeViewComponent } from "./home-view/home-view.component";
import { LoginViewComponent } from "./login-view/login-view.component";
import { ContactsViewComponent } from './contacts-view/contacts-view.component';
import { KalYearViewComponent } from './kal-year-view/kal-year-view.component';
import { KalMonthViewComponent } from './kal-month-view/kal-month-view.component';

import { SheetOfPaperComponent } from "./login-view/sheet-of-paper/sheet-of-paper.component";
import { LoginPanelComponent } from './login-view/login-panel/login-panel.component';
import { PolaroidComponent } from './login-view/polaroid/polaroid.component';

import { TopMenuComponent } from './home-view/top-menu/top-menu.component';

@NgModule({
    imports: [BrowserModule, RouterModule, KalendarModule, CoreModule],
    declarations: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, KalMonthViewComponent, ContactsViewComponent, 
        SheetOfPaperComponent, LoginPanelComponent, PolaroidComponent,
        TopMenuComponent],
    exports: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, KalMonthViewComponent, ContactsViewComponent],
    providers: []
})
export class ViewsModule { }