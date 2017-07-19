import { Component, Input, OnInit, HostListener } from '@angular/core';
import { KalModalService } from './kal-modal.service';

@Component({
    selector: 'kal-modal',
    templateUrl: './kal-modal.component.html',
    styleUrls: ['./kal-modal.component.scss']
})
export class KalModalComponent implements OnInit {

    @Input() modalId: string;
    @Input() modalTitle: string;
    @Input() blocking = false;
    isOpen = false;

    @HostListener('keyup') onMouseEnter(event) {
        this.keyup(event);
    }

    constructor(private modalService: KalModalService) {
    }

    ngOnInit() {
        console.log("oninit", this.modalId);
        console.log("oninit", this.modalTitle);
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

    /* ts appelant
    @ViewChild(KalModalComponent) modal: KalModalComponent;
    constructor(public kalModalService: KalModalService) { }
    showModal() {
        this.kalModalService.registerModal(this.modal);
        this.kalModalService.open("modalId");
    }
    */
    /* common.module
        declarations: [..., KalModalComponent],
        exports: [..., KalModalComponent],
        providers: [KalModalService]
    */

}