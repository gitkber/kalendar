import { Route } from '@angular/router';

import { LoginViewComponent } from './views/login-view/login-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ContactsViewComponent } from './views/contacts-view/contacts-view.component';
import { CatchAllViewComponent } from './views/catch-all-view/catch-all-view.component';
import { KalYearViewComponent } from './views/year-view/year-view.component';
import { MonthViewComponent } from './views/month-view/month-view.component';

import { AuthGuard } from './core/service/auth.guard';

export const routes: Route[] = [
    {path: '', component: LoginViewComponent},
    {path: 'home', component: HomeViewComponent, canActivate: [AuthGuard]},
    {path: 'contacts', component: ContactsViewComponent, canActivate: [AuthGuard]},
    {path: 'catchall', component: CatchAllViewComponent, canActivate: [AuthGuard]},
    {path: 'kalyear/:date', component: KalYearViewComponent, canActivate: [AuthGuard]},
    {path: 'kalmonth/:date', component: MonthViewComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];
