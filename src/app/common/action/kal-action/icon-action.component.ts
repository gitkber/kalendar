import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'icon-action',
    template: `
        <span class="fa-stack">
            <i class="fa fa-square fa-stack-2x text-background"></i>
            <i *ngIf="image" [class]="image"></i>
        </span>`,
    styleUrls: ['./action.component.css']
})
// TODO Rename to GreatIconActionComponent or FormIconActionComponent or ???
export class IconActionComponent implements OnInit {

    @Input() image: string;

    ngOnInit() {
        this.image = 'fa ' + this.image + ' fa-stack-1x text-action';
    }
}
