import { Component, Input } from '@angular/core';

@Component({
    selector: 'edit-action',
    template: `
        <span class="fa-stack" [title]="tooltip">
            <i class="fa fa-square fa-stack-2x text-background"></i>
            <i class="fa fa-pencil fa-stack-1x text-action"></i>
        </span>`,
    styleUrls: ['./action.component.css']
})
export class EditActionComponent {

    @Input() tooltip: string;

}
