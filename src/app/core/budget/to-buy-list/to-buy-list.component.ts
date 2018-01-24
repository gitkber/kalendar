import { Component, Input, OnInit } from '@angular/core';
import { Budget } from '../budget';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'to-buy-list',
    templateUrl: './to-buy-list.component.html',
    styleUrls: ['./to-buy-list.component.css']
})
export class ToBuyListComponent implements OnInit {

    @Input() budgets: Observable<Budget>;

    constructor() { }

    ngOnInit() {
    }

}
