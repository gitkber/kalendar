import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../../../kalendar/day/day';
import { LineAction } from '../../../core/line/line-action';
import { LineService } from '../../../core/line/line.service';
import { DayItem } from '../../../kalendar/day-item';
import { Line } from '../../../core/line/line';

@Component({
    selector: 'day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    @Input() blocking = false;

    public isOpen = false;
    public lineSelected: Line;
    public day: Day;

    constructor(private lineService: LineService) { }

    ngOnInit() { }

    open(day: Day): void {
        this.isOpen = true;
        this.day = day;
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    selectDayItem(dayItem: DayItem) {
        if (dayItem.isLine()) {
            this.lineSelected = new Line(null, dayItem.item, this.day.date.toJSON('yyyy-MM-dd'));
            this.lineSelected['$key'] = dayItem.key;
            /*this.day.dayItems.splice(this.day.dayItems.indexOf(dayItem), 1);*/
        }
    }

    doActionOnLine(event: LineAction) {
        console.log('doActionOnLine event', event);
        this.lineService.doActionOnLine(event);
    }
}
