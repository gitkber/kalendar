import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Day } from '../../../kalendar/day/day';
import { LineService } from '../../../core/line/line.service';
import { DayItem } from '../../../kalendar/day-item';
import { LineCriteria } from '../../../core/line/line-criteria';

@Component({
    selector: 'day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    private datePipe: DatePipe = new DatePipe(this._locale);

    @Input() blocking = false;

    public isOpen = false;
    public lineCriteriaSelected: LineCriteria;
    public day: Day;

    constructor(@Inject(LOCALE_ID) private _locale: string, private lineService: LineService) { }

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
            this.lineCriteriaSelected = new LineCriteria(dayItem.item, this.datePipe.transform(this.day.date, 'yyyy-MM-dd'), dayItem.key);
        }
    }

    doActionOnLine(event: LineCriteria) {
        console.log('doActionOnLine event', event);
        this.lineService.doActionOnLine(event);
    }
}
