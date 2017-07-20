import { Component, Input } from '@angular/core';

@Component({
    selector: 'kal-button-action',
    templateUrl: './kal-button-action.component.html',
    styleUrls: ['./kal-button-action.component.css']
})
export class KalButtonActionComponent {

    @Input() label: string;
    @Input() image: string;

}
