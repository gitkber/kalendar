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
    @Input() title: string;
    @Output() showCatchAllClick: EventEmitter<CatchAll> = new EventEmitter();

    showCatchAll(contact: CatchAll) {
        this.showCatchAllClick.emit(contact);
    }

    addCatchTodo() {
        this.showCatchAllClick.emit(new CatchAll(null, 'TODOs', this.title, null, null));
    }

    addCatchObjective() {
        this.showCatchAllClick.emit(new CatchAll(null, 'OBJECTIVE', this.title, null, null));
    }

}
