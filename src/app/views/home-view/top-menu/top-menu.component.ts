import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

    @Input() navigation: string; // year - month - day
    @Output() nextClick: EventEmitter<any> = new EventEmitter();
    @Output() previousClick: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router) { }

    ngOnInit() { }

    navigateToContacts() {
        this.router.navigateByUrl('/contacts');
    }

    navigateToLines() {
        this.router.navigateByUrl('/lines');
    }

    goNext() {
        this.nextClick.emit(this.navigation);
    }

    goPrevious() {
        this.previousClick.emit(this.navigation);
    }
}
