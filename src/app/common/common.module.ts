import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonMenuComponent } from './kal-button-menu/kal-button-menu.component';
import { KalLogoComponent } from './kal-logo/kal-logo.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonMenuComponent, KalLogoComponent],
    exports: [KalButtonMenuComponent, KalLogoComponent],
    providers: []
})
export class CommonModule {
}
