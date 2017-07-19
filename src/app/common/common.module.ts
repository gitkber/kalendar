import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonComponent } from './kal-button/kal-button.component';
import { KalLogoComponent } from './kal-logo/kal-logo.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonComponent, KalLogoComponent],
    exports: [KalButtonComponent, KalLogoComponent],
    providers: []
})
export class CommonModule {
}
