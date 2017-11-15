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

    addCatchAll() {
        this.showCatchAllClick.emit(new CatchAll(null, null, null, null, null));
    }

}
