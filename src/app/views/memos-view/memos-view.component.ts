import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { MemoService } from '../../core/memo/memo.service';
import { Memo } from '../../core/memo/memo';

@Component({
    selector: 'memos-view',
    templateUrl: './memos-view.component.html',
    styleUrls: ['./memos-view.component.css']
})
export class MemosViewComponent implements OnInit {

    public memos: FirebaseListObservable<Memo[]>

    constructor(private memoService: MemoService) { }

    ngOnInit() {
        this.memos = this.memoService.getList();
    }

    showMemo(event: Memo) {
        console.log('showMemo action', event);
    }

}
