import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonMenuComponent } from './kal-button-menu/kal-button-menu.component';
import { KalButtonActionComponent } from './kal-button-action/kal-button-action.component';
import { SvgLoginComponent } from './svg/svg-login.component';
import { SvgSaveComponent } from './svg/svg-save.component';
import { SvgDeleteComponent } from './svg/svg-delete.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonMenuComponent, KalButtonActionComponent,
        SvgLoginComponent, SvgSaveComponent, SvgDeleteComponent],
    exports: [KalButtonMenuComponent, KalButtonActionComponent,
        SvgLoginComponent, SvgSaveComponent, SvgDeleteComponent],
    providers: []
})
export class ActionModule { }
