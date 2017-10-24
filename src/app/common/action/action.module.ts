import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonMenuComponent } from './kal-button-menu/kal-button-menu.component';
import { KalButtonActionComponent } from './kal-button-action/kal-button-action.component';
import { KalActionComponent } from './kal-action/kal-action.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonMenuComponent, KalButtonActionComponent,
        KalActionComponent],
    exports: [KalButtonMenuComponent, KalButtonActionComponent,
        KalActionComponent],
    providers: []
})
export class ActionModule { }
