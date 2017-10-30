import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalendarModule } from '../kalendar/kalendar.module';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '../common/common.module';

import { LoginViewComponent } from './login-view/login-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';
import { KalYearViewComponent } from './year-view/year-view.component';
import { MonthViewComponent } from './month-view/month-view.component';

import { SheetOfPaperComponent } from './login-view/sheet-of-paper/sheet-of-paper.component';
import { PolaroidComponent } from './login-view/polaroid/polaroid.component';
import { ImageModalComponent } from './modal/image-modal/image-modal.component';
import { CoreModalComponent } from './modal/core-modal/core-modal.component';

@NgModule({
    imports: [BrowserModule, RouterModule, KalendarModule, CoreModule, CommonModule],
    declarations: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, MonthViewComponent,
        ContactsViewComponent,
        SheetOfPaperComponent, PolaroidComponent,
        ImageModalComponent, CoreModalComponent],
    exports: [],
    providers: []
})
export class ViewsModule {
}
