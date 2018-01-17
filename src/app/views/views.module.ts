import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalendarModule } from '../kalendar/kalendar.module';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '../common/common.module';

import { ViewsFacade } from './views.facade';

import { LoginViewComponent } from './login-view/login-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';
import { KalYearViewComponent } from './year-view/year-view.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { BudgetViewComponent } from './budget-view/budget-view.component';
import { TimelineViewComponent } from './timeline-view/timeline-view.component';

import { SheetOfPaperComponent } from './login-view/sheet-of-paper/sheet-of-paper.component';
import { ImageModalComponent } from './modal/image-modal/image-modal.component';
import { CoreModalComponent } from './modal/core-modal/core-modal.component';
import { ContactModalComponent } from './modal/contact-modal/contact-modal.component';
import { ObjectiveModalComponent } from './modal/objective-modal/objective-modal.component';

@NgModule({
    imports: [BrowserModule, RouterModule, KalendarModule, CoreModule, CommonModule],
    declarations: [LoginViewComponent, HomeViewComponent, KalYearViewComponent, MonthViewComponent,
        ContactsViewComponent,
        BudgetViewComponent, TimelineViewComponent,
        SheetOfPaperComponent,
        ImageModalComponent, CoreModalComponent, ContactModalComponent, ObjectiveModalComponent],
    exports: [],
    providers: [ViewsFacade]
})
export class ViewsModule {
}
