import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalendarModule } from '../kalendar/kalendar.module';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '../common/common.module';

import { HomeViewComponent } from './home-view/home-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';
import { MemosViewComponent } from './memos-view/memos-view.component';
import { KalYearViewComponent } from './kal-year-view/kal-year-view.component';
import { KalMonthViewComponent } from './kal-month-view/kal-month-view.component';

import { SheetOfPaperComponent } from './login-view/sheet-of-paper/sheet-of-paper.component';
import { PolaroidComponent } from './login-view/polaroid/polaroid.component';
import { DayModalComponent } from './modal/day-modal/day-modal.component';

@NgModule({
    imports: [BrowserModule, RouterModule, KalendarModule, CoreModule, CommonModule],
    declarations: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, KalMonthViewComponent, ContactsViewComponent, MemosViewComponent,
        SheetOfPaperComponent, PolaroidComponent,
        DayModalComponent],
    exports: [],
    providers: []
})
export class ViewsModule {
}
