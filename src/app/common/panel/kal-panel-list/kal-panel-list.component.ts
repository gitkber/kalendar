import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'kal-panel-list',
    templateUrl: './kal-panel-list.component.html',
    styleUrls: ['./kal-panel-list.component.css']
})
export class KalPanelListComponent implements OnInit {

    @Input() title: string;

    constructor() { }

    ngOnInit() {
    }

}
