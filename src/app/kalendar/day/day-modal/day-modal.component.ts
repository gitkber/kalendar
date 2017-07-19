import { Component, Input, OnInit, HostListener } from '@angular/core';
import { DayModalService } from './day-modal.service';
import { Day } from "../day";

@Component({
    selector: 'day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    @Input() modalId: string;
    @Input() blocking = false;
    isOpen = false;
    day: Day;

    @HostListener('keyup') onMouseEnter(event) {
        this.keyup(event);
    }

    constructor(private modalService: DayModalService) {
    }

    ngOnInit() {
        console.log("oninit", this.modalId);
        this.modalService.registerModal(this);
    }

    close(checkBlocking = false): void {
        this.modalService.close(this.modalId, checkBlocking);
    }

    private keyup(event: KeyboardEvent): void {
        if (event.keyCode === 27) {
            this.modalService.close(this.modalId, true);
        }
    }
}