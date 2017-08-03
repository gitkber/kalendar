import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionModule } from './action/action.module';

import { KalLogoComponent } from './kal-logo/kal-logo.component';
import { KalPolaroidComponent } from './kal-polaroid/kal-polaroid.component';
import { DateStringPipe } from './utils/date-string.pipe';
import { KalPanelFormComponent } from './kal-panel-form/kal-panel-form.component';
import { KalModalComponent } from './kal-modal/kal-modal.component';

@NgModule({
    imports: [BrowserModule, RouterModule, ActionModule],
    declarations: [KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        KalPanelFormComponent, KalModalComponent],
    exports: [KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        KalPanelFormComponent, ActionModule],
    providers: []
})
export class CommonModule {
}
