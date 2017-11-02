import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonMenuComponent } from './kal-button-menu/kal-button-menu.component';
import { KalButtonActionComponent } from './kal-button-action/kal-button-action.component';
import { KalActionComponent } from './kal-action/kal-action.component';
import { EditActionComponent } from './kal-action/edit-action.component';
import { PlusActionComponent } from './kal-action/plus-action.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonMenuComponent, KalButtonActionComponent,
        KalActionComponent,
        EditActionComponent, PlusActionComponent],
    exports: [KalButtonMenuComponent, KalButtonActionComponent,
        KalActionComponent,
        EditActionComponent, PlusActionComponent],
    providers: []
})
export class ActionModule {}
