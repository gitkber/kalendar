import { Component, Input } from '@angular/core';

@Component({
    selector: 'kal-panel-form',
    templateUrl: './kal-panel-form.component.html',
    styleUrls: ['./kal-panel-form.component.css']
})
export class KalPanelFormComponent {

    @Input() title: string;
    @Input() subTitle: string;
    @Input() errorMessage: string;

}
