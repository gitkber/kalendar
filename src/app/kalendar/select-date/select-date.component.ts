import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'select-date',
    templateUrl: 'select-date.component.html',
    styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {

    @Input() date: Date;
    @Input() navigation: string; // year - month - day
    @Output() nextClick: EventEmitter<any> = new EventEmitter();
    @Output() previousClick: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    goNext() {
        this.nextClick.emit(this.navigation);
    }

    goPrevious() {
        this.previousClick.emit(this.navigation);
    }

    changeNavigation(navigation: string) {
        this.navigation = navigation;
    }
}