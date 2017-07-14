import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'kal-button',
    templateUrl: './kal-button.component.html',
    styleUrls: ['./kal-button.component.css']
})
export class KalButtonComponent {

    @Input() label: string;
    @Input() image: string;
    @Output() onClick: EventEmitter<any> = new EventEmitter();

    doAction() {
        this.onClick.emit();
    }

}
