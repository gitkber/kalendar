import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Objective } from '../objective';

@Component({
    selector: 'objective-list',
    templateUrl: './objective-list.component.html',
    styleUrls: ['./objective-list.component.css']
})
export class ObjectiveListComponent {

    @Input() items: FirebaseListObservable<Objective[]>;
    @Output() showItemClick: EventEmitter<Objective> = new EventEmitter();

    showItem(contact: Objective) {
        this.showItemClick.emit(contact);
    }

    addItem() {
        this.showItemClick.emit(new Objective(null, null));
    }
}
