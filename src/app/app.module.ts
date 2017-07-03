import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { KalendarModule } from './kalendar/kalendar.module';
import { CoreModule } from './core/core.module';

export const firebaseConfig = {
    apiKey: "AIzaSyDY_s4Lx7hJHhRMbDUuiwTiGiw-BbEH644",
    authDomain: "prjtoto.firebaseapp.com",
    databaseURL: "https://prjtoto.firebaseio.com",
    projectId: "prjtoto",
    storageBucket: "prjtoto.appspot.com",
    messagingSenderId: "130899308329"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViewsModule,
    KalendarModule,
    CoreModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-BE' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
