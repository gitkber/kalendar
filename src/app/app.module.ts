import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
