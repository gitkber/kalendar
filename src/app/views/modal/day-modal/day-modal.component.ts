import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../../../kalendar/day/day';
import { LineService } from '../../../core/line/line.service';
import { DayItem } from '../../../kalendar/day-item';
import { LineCriteria } from '../../../core/line/line-criteria';
import { DateUtilService } from '../../../core/service/date-util.service';

@Component({
    selector: 'day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    @Input() blocking = false;

    public isOpen = false;
    public lineCriteriaSelected: LineCriteria;
    public day: Day;

    constructor(private dateUtilService: DateUtilService, private lineService: LineService) { }

    ngOnInit() { }

    open(day: Day): void {
        this.isOpen = true;
        this.day = day;
        this.lineCriteriaSelected = new LineCriteria(null, this.dateUtilService.toString(this.day.date), null);
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    selectDayItem(dayItem: DayItem) {
        if (dayItem.isLine()) {
            this.lineCriteriaSelected = new LineCriteria(dayItem.item, this.dateUtilService.toString(this.day.date), dayItem.key);
        }
    }

    doActionOnLine(event: LineCriteria) {
        console.log('doActionOnLine event', event);
        this.lineService.doActionOnLine(event);
    }
}
