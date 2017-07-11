import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Line } from '../line';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'line-list',
    templateUrl: './line-list.component.html',
    styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {

    @Input() lines: FirebaseListObservable<Line[]>;
    @Output() showLineClick: EventEmitter<Line> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    showLine(line: Line) {
        this.showLineClick.emit(line);
    }

}
