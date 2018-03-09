import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalendarModule } from '../kalendar/kalendar.module';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '../common/common.module';

import { ViewsFacade } from './views.facade';

import { HomeViewComponent } from './home-view/home-view.component';
import { DayViewComponent } from './day-view/day-view.component';
import { AlbumViewComponent } from './album-view/album-view.component';
import { ContactsViewComponent } from './contacts-view/contacts-view.component';
import { KalYearViewComponent } from './year-view/year-view.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { BudgetViewComponent } from './budget-view/budget-view.component';
import { ObjectiveViewComponent } from './objective-view/objective-view.component';

import { SheetOfPaperComponent } from './home-view/sheet-of-paper/sheet-of-paper.component';
import { ImageModalComponent } from './modal/image-modal/image-modal.component';

@NgModule({
    imports: [BrowserModule, RouterModule, KalendarModule, CoreModule, CommonModule],
    declarations: [HomeViewComponent, DayViewComponent, KalYearViewComponent, MonthViewComponent,
        ContactsViewComponent,
        BudgetViewComponent, ObjectiveViewComponent, AlbumViewComponent,
        SheetOfPaperComponent,
        ImageModalComponent],
    exports: [],
    providers: [ViewsFacade]
})
export class ViewsModule {
}
