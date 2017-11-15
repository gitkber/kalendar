import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatchAll } from '../catch-all';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'catch-all-list',
    templateUrl: './catch-all-list.component.html',
    styleUrls: ['./catch-all-list.component.css']
})
export class CatchAllListComponent {

    @Input() catchAlls: Observable<CatchAll[]>;
    @Output() showCatchAllClick: EventEmitter<CatchAll> = new EventEmitter();

    showCatchAll(contact: CatchAll) {
        this.showCatchAllClick.emit(contact);
    }

    addCatchTodo() {
        this.showCatchAllClick.emit(new CatchAll(null, 'TODOs', null, null, null));
    }

    addCatchAdministrative() {
        this.showCatchAllClick.emit(new CatchAll(null, 'ADMINISTRATIVE', null, null, null));
    }

}
