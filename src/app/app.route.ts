import { Route } from '@angular/router';

import { HomeViewComponent } from './views/home-view/home-view.component';
import { DayViewComponent } from './views/day-view/day-view.component';
import { AlbumViewComponent } from './views/album-view/album-view.component';
import { ContactsViewComponent } from './views/contacts-view/contacts-view.component';
import { BudgetViewComponent } from './views/budget-view/budget-view.component';
import { ObjectiveViewComponent } from './views/objective-view/objective-view.component';
import { KalYearViewComponent } from './views/year-view/year-view.component';
import { MonthViewComponent } from './views/month-view/month-view.component';

import { AuthGuard } from './core/service/auth.guard';

export const routes: Route[] = [
    {path: '', component: HomeViewComponent},
    {path: 'day', component: DayViewComponent, canActivate: [AuthGuard]},
    {path: 'album', component: AlbumViewComponent, canActivate: [AuthGuard]},
    {path: 'contacts', component: ContactsViewComponent, canActivate: [AuthGuard]},
    {path: 'budget', component: BudgetViewComponent, canActivate: [AuthGuard]},
    {path: 'objective', component: ObjectiveViewComponent, canActivate: [AuthGuard]},
    {path: 'kalyear/:date', component: KalYearViewComponent, canActivate: [AuthGuard]},
    {path: 'kalmonth/:date', component: MonthViewComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];
