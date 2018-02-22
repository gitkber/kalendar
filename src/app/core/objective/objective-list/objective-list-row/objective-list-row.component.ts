import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective } from '../../objective';

@Component({
    selector: 'objective-list-row',
    templateUrl: './objective-list-row.component.html',
    styleUrls: ['./objective-list-row.component.css']
})
export class ObjectiveListRowComponent {

    @Input() objective: Objective;
    public editMode: boolean;
    @Output() showContactClick: EventEmitter<Objective> = new EventEmitter();

    constructor() { }

    showContact() {
        this.editMode = true;
    }

    close() {
        this.editMode = false;
    }
}
