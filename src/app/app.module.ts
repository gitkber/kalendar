import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';
import { AuthGuard } from './core/service/auth.guard';
import { AppService } from './app.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { KalendarModule } from './kalendar/kalendar.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';

import { environment } from '../environments/environment';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ViewsModule,
        KalendarModule,
        CoreModule,
        CommonModule,
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    providers: [{provide: LOCALE_ID, useValue: 'fr-BE'}, AuthGuard, AppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
