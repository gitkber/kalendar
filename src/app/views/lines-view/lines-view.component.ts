import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { LineService } from '../../core/line/line.service';
import { Line } from '../../core/line/line';

@Component({
    selector: 'lines-view',
    templateUrl: './lines-view.component.html',
    styleUrls: ['./lines-view.component.css']
})
export class LinesViewComponent implements OnInit {

    public lines: FirebaseListObservable<Line[]>

    constructor(private lineService: LineService) { }

    ngOnInit() {
        this.lines = this.lineService.getList();
    }

    showLine(event: Line) {
        console.log('showLine action', event);
    }

}
