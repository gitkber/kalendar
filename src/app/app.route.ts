import { Route } from '@angular/router';

import { LoginViewComponent } from './views/login-view/login-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ContactsViewComponent } from './views/contacts-view/contacts-view.component';
import { LinesViewComponent } from './views/lines-view/lines-view.component';
import { KalYearViewComponent } from './views/kal-year-view/kal-year-view.component';
import { KalMonthViewComponent } from './views/kal-month-view/kal-month-view.component';

export const routes: Route[] = [
    { path: '', component: LoginViewComponent },
    { path: 'home', component: HomeViewComponent },
    { path: 'contacts', component: ContactsViewComponent },
    { path: 'lines', component: LinesViewComponent },
    { path: 'kalyear', component: KalYearViewComponent },
    { path: 'kalmonth', component: KalMonthViewComponent },
    { path: '**', redirectTo: '' }
];