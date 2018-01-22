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
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PostItComponent } from './post-it/post-it.component';

import { LogoColorDirective } from './kal-logo/logo-color.directive';

import { FileService } from './file-upload/file-service';
import { DateUtilService } from './utils/date-util.service';

@NgModule({
    imports: [BrowserModule, RouterModule, ActionModule, FileUploadModule, HttpModule],
    declarations: [KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        LogoColorDirective,
        FileUploadComponent, PostItComponent],
    exports: [KalLogoComponent, KalPolaroidComponent, DateStringPipe,
        ActionModule, PanelModule,
        LogoColorDirective,
        FileUploadComponent, PostItComponent],
    providers: [FileService, DateUtilService]
})
export class CommonModule {
}
