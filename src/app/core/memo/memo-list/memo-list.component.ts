import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Memo } from '../memo';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'memo-list',
    templateUrl: './memo-list.component.html',
    styleUrls: ['./memo-list.component.css']
})
export class MemoListComponent implements OnInit {

    @Input() memos: FirebaseListObservable<Memo[]>;
    @Output() showMemoClick: EventEmitter<Memo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    showMemo(memo: Memo) {
        this.showMemoClick.emit(memo);
    }

}