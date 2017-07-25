import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonActionComponent } from './kal-button-action/kal-button-action.component';
import { KalButtonMenuComponent } from './kal-button-menu/kal-button-menu.component';
import { KalLogoComponent } from './kal-logo/kal-logo.component';
import { KalPolaroidComponent } from './kal-polaroid/kal-polaroid.component';
import { DateStringPipe } from './pipe/date-string.pipe';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonActionComponent, KalButtonMenuComponent, KalLogoComponent, KalPolaroidComponent, DateStringPipe],
    exports: [KalButtonActionComponent, KalButtonMenuComponent, KalLogoComponent, KalPolaroidComponent, DateStringPipe],
    providers: []
})
export class CommonModule {
}
