import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CatchAll } from '../../core/catch-all/catch-all';
import { CatchAllService } from '../../core/catch-all/catch-all.service';
import { CatchAllModalComponent } from '../modal/catch-all-modal/catch-all-modal.component';
import { TagCase, TagCaseType } from '../../common/utils/tag';

@Component({
    selector: 'catch-all-view',
    templateUrl: './catch-all-view.component.html',
    styleUrls: ['./catch-all-view.component.css']
})
export class CatchAllViewComponent implements OnInit {

    @ViewChild(CatchAllModalComponent) modal: CatchAllModalComponent;

    TagCase = TagCase;
    TagCaseType = TagCaseType;

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

            this.catchAllsAdministration = this.catchAllService.getCatchAllByTagCaseType(TagCaseType.ADMINISTRATION);
            this.catchAllsFamily = this.catchAllService.getCatchAllByTagCaseType(TagCaseType.FAMILY);
            this.catchAllsProject = this.catchAllService.getCatchAllByTagCaseType(TagCaseType.PROJECT);
            this.catchAllsHealth = this.catchAllService.getCatchAllByTagCaseType(TagCaseType.HEALTH);
            this.catchAllsToBuy = this.catchAllService.getCatchAllByTagCaseType(TagCaseType.TO_BUY);
            this.catchAllsThoughtOfDay = this.catchAllService.getCatchAllByTagCaseType(TagCaseType.THOUGHT_OF_DAY);
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
