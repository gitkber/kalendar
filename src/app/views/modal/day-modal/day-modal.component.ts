import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Day } from '../../../kalendar/day/day';

@Component({
    selector: 'day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    @Input() blocking = false;
    isOpen = false;
    day: Day;

    @HostListener('keyup') onMouseEnter(event) {
        this.keyup(event);
    }

    constructor() { }

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

    private keyup(event: KeyboardEvent): void {
        if (event.keyCode === 27) {
            this.close(true);
        }
    }
}
