import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KalPanelListComponent } from './kal-panel-list/kal-panel-list.component';
import { KalPanelFormComponent } from './kal-panel-form/kal-panel-form.component';
import { KalPanelListRowComponent } from './kal-panel-list-row/kal-panel-list-row.component';
import { ActionModule } from '../action/action.module';

@NgModule({
    imports: [BrowserModule, RouterModule, ActionModule],
    declarations: [KalPanelListComponent, KalPanelFormComponent, KalPanelListRowComponent],
    exports: [KalPanelListComponent, KalPanelFormComponent, KalPanelListRowComponent],
    providers: []
})
export class PanelModule { }
