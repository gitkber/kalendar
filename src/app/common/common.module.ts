import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonComponent } from './kal-button/kal-button.component';
import { KalLogoComponent } from './kal-logo/kal-logo.component';
import { KalModalComponent } from './kal-modal/kal-modal.component';
import { KalModalService } from './kal-modal/kal-modal.service';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonComponent, KalLogoComponent, KalModalComponent],
    exports: [KalButtonComponent, KalLogoComponent, KalModalComponent],
    providers: [KalModalService]
})
export class CommonModule {
}
