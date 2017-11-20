import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewsFacade } from '../views.facade';
import { RouterService } from '../../core/service/router.service';
import { AppService } from '../../app.service';
import { ImageModalComponent } from '../modal/image-modal/image-modal.component';
import { Navigation } from '../../kalendar/navigation';
import { CarouselDays } from '../../kalendar/carousel-days/carousel-days';
import { CoreModalComponent } from '../modal/core-modal/core-modal.component';
import { DayItem } from '../../kalendar/day-item';
import { Observable } from 'rxjs/Observable';
import { CatchAll } from '../../core/catch-all/catch-all';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    @ViewChild(CoreModalComponent) coreModal: CoreModalComponent;
    @ViewChild(ImageModalComponent) imageModal: ImageModalComponent;

    public carouselDays: CarouselDays;
    public catchAllsAdministration: Observable<CatchAll[]>;
    public catchAllsFamily: Observable<CatchAll[]>;
    public catchAllsProject: Observable<CatchAll[]>;
    public catchAllsHealth: Observable<CatchAll[]>;

    constructor(
        public routerService: RouterService,
        private viewsFacade: ViewsFacade,
        private appService: AppService
    ) { }

    ngOnInit(): void {
        this.carouselDays = new CarouselDays(this.appService.currentDate);
        this.viewsFacade.populateDays(this.carouselDays.days);

        // this.catchAlls = this.viewsFacade.catchAllService.getCatchAll();
        this.catchAllsAdministration = this.viewsFacade.catchAllService.getCatchAllAdministration();
        this.catchAllsFamily = this.viewsFacade.catchAllService.getCatchAllFamily();
        this.catchAllsProject = this.viewsFacade.catchAllService.getCatchAllProject();
        this.catchAllsHealth = this.viewsFacade.catchAllService.getCatchAllHealth();

    }

    navigate(event: Navigation) {
        if (event.isToday) {
            this.viewsFacade.populateDays(this.carouselDays.goToday());
        } else if (event.isNext) {
            this.viewsFacade.populateDays(this.carouselDays.nextWeek());
        } else if (event.isPrevious) {
            this.viewsFacade.populateDays(this.carouselDays.previousWeek());
        } else if (event.isMonth) {
            this.routerService.navigateToKalMonth(event.toDate);
        } else if (event.isYear) {
            this.routerService.navigateToKalYear(event.toDate);
        } else if (event.isDay) {
            this.viewsFacade.populateDays(this.carouselDays.goToDate(event.toDate));
        } else {
            console.warn('ERROR in CarouselView - Navigation');
        }
    }

    showDayItem(event: DayItem) {
        this.coreModal.open(event);
    }

    showImage(event: Date) {
        this.imageModal.open(event);
    }

    log(id) {
        console.log('id', id);
    }

}
