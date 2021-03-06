import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'plus-icon-action',
    template: `
        <span class="fa-stack" [title]="tooltip">
            <i class="fa fa-square fa-stack-2x text-background"></i>
            <i [class]="image"></i>
            <i class="fa fa-plus fa-stack text-icon-action"></i>
        </span>`,
    styleUrls: ['./action.component.css']
})
export class PlusIconActionComponent implements OnInit {

    @Input() tooltip: string;
    @Input() image: string;

    ngOnInit() {
        this.image = 'fa ' + this.image + ' fa-stack-1x fa-inverse'
    }
}
