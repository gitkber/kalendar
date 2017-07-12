import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kal-year-view',
    templateUrl: './kal-year-view.component.html',
    styleUrls: ['./kal-year-view.component.css']
})
export class KalYearViewComponent implements OnInit {

    public selectedDate: Date;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.selectedDate = new Date(params['date']);
        });
    }

}
