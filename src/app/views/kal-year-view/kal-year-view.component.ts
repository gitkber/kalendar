import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Year } from '../../kalendar/year/year';

@Component({
    selector: 'kal-year-view',
    templateUrl: './kal-year-view.component.html',
    styleUrls: ['./kal-year-view.component.css']
})
export class KalYearViewComponent implements OnInit {

    public year: Year;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const selectedDate: Date = new Date(params['date']);
            this.year = new Year(selectedDate.getFullYear());
        });
    }

}
