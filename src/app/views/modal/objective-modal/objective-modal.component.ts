import { Component, HostListener, Input } from '@angular/core';
import { Objective, ObjectiveAction } from '../../../core/objective/objective';
import { ObjectiveService } from '../../../core/objective/objective.service';

@Component({
    selector: 'objective-modal',
    templateUrl: './objective-modal.component.html',
    styleUrls: ['./objective-modal.component.css']
})
export class ObjectiveModalComponent {

    @Input() blocking = false;

    public isOpen = false;
    public objective: Objective;

    constructor(private objectiveService: ObjectiveService) {
        console.log('ObjectiveModalComponent');
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.close();
    }

    open(contact: Objective): void {
        this.isOpen = true;
        this.objective = contact;
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    doActionOnCatchAll(event: ObjectiveAction) {
        // this.objectiveService.doActionOn(event);
        this.close();
    }

}
