import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionModule } from './action/action.module';
import { PanelModule } from './panel/panel.module';

import { KalLogoComponent } from './kal-logo/kal-logo.component';
import { KalPolaroidComponent } from './kal-polaroid/kal-polaroid.component';
import { DateStringPipe } from './utils/date-string.pipe';
import { KalModalComponent } from './kal-modal/kal-modal.component';
import { LogoColorDirective } from './kal-logo/logo-color.directive';


@NgModule({
    imports: [BrowserModule, RouterModule, ActionModule],
    declarations: [KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        KalModalComponent,
        LogoColorDirective],
    exports: [KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        ActionModule, PanelModule,
        LogoColorDirective],
    providers: []
})
export class CommonModule {
}
