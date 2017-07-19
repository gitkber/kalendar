import { Component, Input } from '@angular/core';

@Component({
    selector: 'kal-button',
    templateUrl: './kal-button.component.html',
    styleUrls: ['./kal-button.component.css']
})
export class KalButtonComponent {

    @Input() label: string;
    @Input() image: string;
    @Input() selected: boolean;

}
