import { Route } from '@angular/router';

import { LoginViewComponent } from './views/login-view/login-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ContactsViewComponent } from './views/contacts-view/contacts-view.component';
import { MemosViewComponent } from './views/memos-view/memos-view.component';
import { KalYearViewComponent } from './views/kal-year-view/kal-year-view.component';
import { KalMonthViewComponent } from './views/kal-month-view/kal-month-view.component';

import { AuthGuard } from './core/service/auth.guard';

export const routes: Route[] = [
    { path: '', component: LoginViewComponent },
    { path: 'home', component: HomeViewComponent, canActivate: [AuthGuard] },
    { path: 'contacts', component: ContactsViewComponent, canActivate: [AuthGuard] },
    { path: 'memos', component: MemosViewComponent, canActivate: [AuthGuard] },
    { path: 'kalyear/:date', component: KalYearViewComponent, canActivate: [AuthGuard] },
    { path: 'kalmonth/:date', component: KalMonthViewComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
