import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonActionComponent } from './kal-button-action/kal-button-action.component';
import { KalButtonMenuComponent } from './kal-button-menu/kal-button-menu.component';
import { KalLogoComponent } from './kal-logo/kal-logo.component';
import { KalPolaroidComponent } from './kal-polaroid/kal-polaroid.component';
import { DateStringPipe } from './pipe/date-string.pipe';
import { SvgLoginComponent } from "./svg/svg-login.component";
import { SvgSaveComponent } from "./svg/svg-save.component";
import { SvgDeleteComponent } from "./svg/svg-delete.component";

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonActionComponent, KalButtonMenuComponent, KalLogoComponent, KalPolaroidComponent, DateStringPipe, 
        SvgLoginComponent, SvgSaveComponent, SvgDeleteComponent],
    exports: [KalButtonActionComponent, KalButtonMenuComponent, KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        SvgLoginComponent, SvgSaveComponent, SvgDeleteComponent],
    providers: []
})
export class CommonModule {
}
