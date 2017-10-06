import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';
import { ActionModule } from './action/action.module';
import { PanelModule } from './panel/panel.module';

import { KalLogoComponent } from './kal-logo/kal-logo.component';
import { KalPolaroidComponent } from './kal-polaroid/kal-polaroid.component';
import { DateStringPipe } from './utils/date-string.pipe';
import { KalModalComponent } from './kal-modal/kal-modal.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { LogoColorDirective } from './kal-logo/logo-color.directive';

import { FileService } from './file-upload/file-service';

@NgModule({
    imports: [BrowserModule, RouterModule, ActionModule, FileUploadModule, HttpModule],
    declarations: [KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        KalModalComponent,
        LogoColorDirective,
        FileUploadComponent],
    exports: [KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        ActionModule, PanelModule,
        LogoColorDirective,
        FileUploadComponent],
    providers: [FileService]
})
export class CommonModule {
}
