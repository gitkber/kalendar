import { Component, HostListener, Input } from '@angular/core';
import { ViewsFacade } from '../../views.facade';
import { CatchAll, CatchAllAction } from '../../../core/catch-all/catch-all';

@Component({
    selector: 'catch-all-modal',
    templateUrl: './catch-all-modal.component.html',
    styleUrls: ['./catch-all-modal.component.css']
})
export class CatchAllModalComponent {

    @Input() blocking = false;

    public isOpen = false;
    public catchAllSelected: CatchAll;

    constructor(private viewsFacade: ViewsFacade) {
        console.log('CatchAllModalComponent');
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.close();
    }

    open(contact: CatchAll): void {
        this.isOpen = true;
        this.catchAllSelected = contact;
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    doActionOnCatchAll(event: CatchAllAction) {
        this.viewsFacade.catchAllService.doActionOnCatchAll(event);
        this.close();
    }

}
