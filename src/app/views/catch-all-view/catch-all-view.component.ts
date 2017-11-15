import { Component, OnInit, ViewChild } from '@angular/core';
import { CatchAll, CatchAllAction } from '../../core/catch-all/catch-all';
import { CatchAllService } from '../../core/catch-all/catch-all.service';
import { Observable } from 'rxjs/Observable';
import { CatchAllModalComponent } from '../modal/catch-all-modal/catch-all-modal.component';

@Component({
    selector: 'catch-all-view',
    templateUrl: './catch-all-view.component.html',
    styleUrls: ['./catch-all-view.component.css']
})
export class CatchAllViewComponent implements OnInit {

    @ViewChild(CatchAllModalComponent) modal: CatchAllModalComponent;

    public catchAlls: Observable<CatchAll[]>;

    constructor(private catchAllService: CatchAllService) { }

    ngOnInit() {
        this.catchAlls = this.catchAllService.getCatchAll();
    }

    showCatchAll(event: CatchAll) {
        this.modal.open(event);
    }

    doActionOnCatchAll(event: CatchAllAction) {
        this.catchAllService.doActionOnCatchAll(event);
    }
}
