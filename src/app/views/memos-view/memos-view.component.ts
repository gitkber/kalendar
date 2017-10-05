import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { MemoService } from '../../core/memo/memo.service';
import { Memo } from '../../core/memo/memo';
import { MemoAction } from '../../core/memo/memo-action';
import { Action } from '../../core/action';
import { ContactHolidayService } from '../../core/holiday/contact-holiday/contact-holiday.service';
import { ContactHolidayAction } from '../../core/holiday/contact-holiday/contact-holiday-action';
import { ContactHoliday } from '../../core/holiday/contact-holiday/contact-holiday';

@Component({
    selector: 'memos-view',
    templateUrl: './memos-view.component.html',
    styleUrls: ['./memos-view.component.css']
})
export class MemosViewComponent implements OnInit {

    public memos: FirebaseListObservable<Memo[]>

    constructor(private memoService: MemoService, private contactHolidayService: ContactHolidayService) { }

    ngOnInit() {
        this.memos = this.memoService.getList();
    }

    showMemo(event: Memo) {
        console.log('showMemo action', event);
        /*
        const memoCriteria: MemoCriteria = new MemoCriteria(null, null, event['$key']);
        memoCriteria.action = Action.DELETE;
        this.memoService.doActionOnMemo(memoCriteria);

        const holiday = new ContactHoliday(null, null, event.description, event.kalendarDate);
        const contactHolidayAction: ContactHolidayAction = new ContactHolidayAction(Action.INSERT);
        contactHolidayAction.holiday = holiday;
        this.contactHolidayService.doActionOnContactHoliday(contactHolidayAction);
        */
    }

}
