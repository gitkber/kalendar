import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'edit-action',
	template: `
        <span class="fa-stack" [title]="tooltip">
            <i class="fa fa-square fa-stack-2x text-background"></i>
            <i [class]="image"></i>
            <i class="fa fa-pencil fa-stack text-action"></i>
        </span>`,
    styleUrls: ['./small-action.component.css']
})
export class EditActionComponent implements OnInit {

	@Input() tooltip: string;
    @Input() image: string;

	ngOnInit() {
		this.image = 'fa ' + this.image + ' fa-stack-1x fa-inverse'
	}
}
