import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LineService } from "../../core/line/line.service";
import { Line } from "../../core/line/line";
import { LineAction } from "../../core/line/line-action";

@Component({
  selector: 'lines-view',
  templateUrl: './lines-view.component.html',
  styleUrls: ['./lines-view.component.css']
})
export class LinesViewComponent implements OnInit {
  /*
    title = 'Kalendar';
    items: FirebaseListObservable<any[]>;
  
    constructor(public af: AngularFireDatabase) {
      this.items = af.list('/messages', {
        query: {
          limitToLast: 50
        }
      });
    }
  */
  private lineSelected: Line;
  private lines: FirebaseListObservable<Line[]>

  constructor(private lineService: LineService) { }

  ngOnInit() {
    this.lines = this.lineService.getList();
  }

  showLine(event: Line) {
    this.lineSelected = event;
  }

  doActionOnLine(event: LineAction) {
    console.log("doActionOnLine event", event);
    this.lineService.doActionOnLine(event);
  }
}
