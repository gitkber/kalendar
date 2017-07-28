import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Navigation } from '../navigation';

@Component({
    selector: 'select-date',
    templateUrl: 'select-date.component.html',
    styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {

    @Input() date: Date;
    @Input() navigation: string; // year - month - day
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    goToday() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isToday = true;
        this.navigateClick.emit(navigation);
    }

    goNext() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isNext = true;
        this.navigateClick.emit(navigation);
    }

    goPrevious() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isPrevious = true;
        this.navigateClick.emit(navigation);
    }

    changeNavigation(navigation: string) {
        this.navigation = navigation;
    }
}
