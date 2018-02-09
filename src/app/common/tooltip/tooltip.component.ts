import { Component, Input } from '@angular/core';

@Component({
    selector: 'tooltip-content',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.css']
})

export class TooltipComponent {

    @Input() label: string;
    @Input() side: string = 'bottom';

}
