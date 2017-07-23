import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonActionComponent } from './kal-button-action/kal-button-action.component';
import { KalButtonMenuComponent } from './kal-button-menu/kal-button-menu.component';
import { KalLogoComponent } from './kal-logo/kal-logo.component';
import { KalPolaroidComponent } from './kal-polaroid/kal-polaroid.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonActionComponent, KalButtonMenuComponent, KalLogoComponent, KalPolaroidComponent],
    exports: [KalButtonActionComponent, KalButtonMenuComponent, KalLogoComponent, KalPolaroidComponent],
    providers: []
})
export class CommonModule {
}
