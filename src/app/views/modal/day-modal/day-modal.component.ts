import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Day } from '../../../kalendar/day/day';
import { MemoService } from '../../../core/memo/memo.service';
import { DayItem } from '../../../kalendar/day-item';
import { MemoCriteria } from '../../../core/memo/memo-criteria';
import { DateUtilService } from '../../../core/service/date-util.service';

@Component({
    selector: 'day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    @Input() blocking = false;

    public isOpen = false;
    public memoCriteriaSelected: MemoCriteria;
    public day: Day;

    constructor(private dateUtilService: DateUtilService, private memoService: MemoService) { }

    ngOnInit() { }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(evt: KeyboardEvent) {
        this.close();
    }

    open(day: Day): void {
        this.isOpen = true;
        this.day = day;
        this.memoCriteriaSelected = new MemoCriteria(null, this.dateUtilService.toString(this.day.date), null);
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    selectDayItem(dayItem: DayItem) {
        if (dayItem.isMemo()) {
            this.memoCriteriaSelected = new MemoCriteria(dayItem.principalItem, this.dateUtilService.toString(this.day.date), dayItem.key);
        }
    }

    doActionOnMemo(event: MemoCriteria) {
        this.memoService.doActionOnMemo(event);
    }
}
