import { Component, OnInit, ViewChild } from '@angular/core';
import { CatchAll } from '../../core/catch-all/catch-all';
import { CatchAllService } from '../../core/catch-all/catch-all.service';
import { Observable } from 'rxjs/Observable';
import { CatchAllModalComponent } from '../modal/catch-all-modal/catch-all-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'catch-all-view',
    templateUrl: './catch-all-view.component.html',
    styleUrls: ['./catch-all-view.component.css']
})
export class CatchAllViewComponent implements OnInit {

    @ViewChild(CatchAllModalComponent) modal: CatchAllModalComponent;

    public catchAlls: Observable<CatchAll[]>;
    public principalTagCaseType: string;

    public catchAllsAdministration: Observable<CatchAll[]>;
    public catchAllsFamily: Observable<CatchAll[]>;
    public catchAllsProject: Observable<CatchAll[]>;
    public catchAllsHealth: Observable<CatchAll[]>;
    public catchAllsToBuy: Observable<CatchAll[]>;
    public catchAllsThoughtOfDay: Observable<CatchAll[]>;

    constructor(private route: ActivatedRoute, public catchAllService: CatchAllService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.principalTagCaseType = params['tagCaseType'];
            this.catchAlls = this.catchAllService.getCatchAllByTagCaseType(this.principalTagCaseType);

            this.catchAllsAdministration = this.catchAllService.getCatchAllAdministration();
            this.catchAllsFamily = this.catchAllService.getCatchAllFamily();
            this.catchAllsProject = this.catchAllService.getCatchAllProject();
            this.catchAllsHealth = this.catchAllService.getCatchAllHealth();
            this.catchAllsToBuy = this.catchAllService.getCatchAllByTagCaseType('TO_BUY');
            this.catchAllsThoughtOfDay = this.catchAllService.getCatchAllByTagCaseType('THOUGHT_OF_DAY');
        });
    }

    showCatchAll(event: CatchAll) {
        this.modal.open(event);
    }

    changePrincipalCatchAll(tagCaseType: string) {
        this.principalTagCaseType = tagCaseType;
        this.catchAlls = this.catchAllService.getCatchAllByTagCaseType(this.principalTagCaseType);
    }

}
