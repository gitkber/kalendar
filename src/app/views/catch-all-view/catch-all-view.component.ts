import { Component, OnInit } from '@angular/core';
import { CatchAll, CatchAllAction } from '../../core/catch-all/catch-all';
import { CatchAllService } from '../../core/catch-all/catch-all.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'catch-all-view',
    templateUrl: './catch-all-view.component.html',
    styleUrls: ['./catch-all-view.component.css']
})
export class CatchAllViewComponent implements OnInit {

    public catchAllSelected: CatchAll;
    public catchAlls: Observable<CatchAll[]>;

    constructor(private catchAllService: CatchAllService) { }

    ngOnInit() {
        this.catchAlls = this.catchAllService.getCatchAll();
        this.catchAllSelected = new CatchAll(null, null, null, null, null);
    }

    showCatchAll(event: CatchAll) {
        this.catchAllSelected = event;
    }

    doActionOnContact(event: CatchAllAction) {
        // this.catchAllService.doActionOnContact(event);
    }
}
