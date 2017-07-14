import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalButtonComponent } from './kal-button/kal-button.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [KalButtonComponent],
    exports: [KalButtonComponent],
    providers: []
})
export class CommonModule {
}
