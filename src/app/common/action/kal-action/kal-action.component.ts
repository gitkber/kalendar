import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'kal-action',
	template: `
	<i *ngIf="image" [class]="image"></i>
`,
    styleUrls: ['./kal-action.component.css']
})
export class KalActionComponent implements OnInit { 

	@Input() image: string;

	ngOnInit() {
		this.image = 'fa ' + this.image + ' fa-2x'
	}
}
