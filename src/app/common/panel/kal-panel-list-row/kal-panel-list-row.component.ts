import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'kal-panel-list-row',
    templateUrl: './kal-panel-list-row.component.html',
    styleUrls: ['./kal-panel-list-row.component.css']
})
export class KalPanelListRowComponent {

    @Input() image: string;
    @Input() description: string;
    @Input() descriptionDate: Date;
    @Output() editItemClick: EventEmitter<any> = new EventEmitter();

    editItem() {
        this.editItemClick.emit();
    }
}
