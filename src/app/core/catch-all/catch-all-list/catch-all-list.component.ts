import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CatchAll } from '../catch-all';
import { TagCase } from '../../../common/utils/tag';

@Component({
    selector: 'catch-all-list',
    templateUrl: './catch-all-list.component.html',
    styleUrls: ['./catch-all-list.component.css']
})
export class CatchAllListComponent {

    @Input() catchAlls: Observable<CatchAll[]>;
    @Input() title: string;
    @Output() showCatchAllClick: EventEmitter<CatchAll> = new EventEmitter();

    TagCase = TagCase;

    showCatchAll(contact: CatchAll) {
        this.showCatchAllClick.emit(contact);
    }

    addCatchAll(tagCase: string) {
        this.showCatchAllClick.emit(new CatchAll(null, tagCase, this.title, null, null));
    }

}
