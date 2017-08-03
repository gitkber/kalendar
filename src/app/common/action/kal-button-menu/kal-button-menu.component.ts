import { Component, Input } from '@angular/core';

@Component({
    selector: 'kal-button-menu',
    templateUrl: './kal-button-menu.component.html',
    styleUrls: ['./kal-button-menu.component.css']
})
export class KalButtonMenuComponent {

    @Input() label: string;
    @Input() image: string;
    @Input() selected: boolean;

}
