import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TagCase } from '../../../common/utils/tag';
import { Observable } from 'rxjs/Observable';
import { CatchAll } from '../catch-all';

@Component({
    selector: 'catch-all-post-it',
    templateUrl: './catch-all-post-it.component.html',
    styleUrls: ['./catch-all-post-it.component.css']
})

export class CatchAllPostItComponent {

    @Input() tagCaseType: string;
    @Input() catchAlls: Observable<CatchAll[]>;
    @Output() showDetailClick: EventEmitter<string> = new EventEmitter<string>();

    TagCase = TagCase;

    showDetail() {
        this.showDetailClick.emit(this.tagCaseType);
    }
}
