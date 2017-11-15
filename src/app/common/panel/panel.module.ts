import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalPanelListComponent } from './kal-panel-list/kal-panel-list.component';
import { KalPanelFormComponent } from './kal-panel-form/kal-panel-form.component';
import { ActionModule } from '../action/action.module';

@NgModule({
    imports: [BrowserModule, RouterModule, ActionModule],
    declarations: [KalPanelListComponent, KalPanelFormComponent],
    exports: [KalPanelListComponent, KalPanelFormComponent],
    providers: []
})
export class PanelModule { }
